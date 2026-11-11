import { NextRequest, NextResponse } from 'next/server';

const SHEET_ID = '1adGVYX1uv41nVKiAWjlUUFBH3T-16aCKJAGYnT9MK40';
// The signup tab was renamed; there is no tab called Sheet1.
const MASTER_TAB = 'ORIGINAL SIGN UP';
const EXPECTED_HEADERS = ['Timestamp', 'Parent Name', 'Kid Name', 'Age', 'Grade', 'Position', 'School', 'Program', 'Email'];

type SheetTab = { title: string; sheetId: number };

function loadCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT is not set');
  return JSON.parse(raw) as { client_email?: string; private_key?: string };
}

function googleErrorMessage(body: string) {
  try {
    const parsed = JSON.parse(body) as {
      error?: string | { message?: string };
      error_description?: string;
    };
    if (typeof parsed.error === 'string') {
      return parsed.error_description ? `${parsed.error}: ${parsed.error_description}` : parsed.error;
    }
    return parsed.error?.message || body.slice(0, 500);
  } catch {
    return body.slice(0, 500);
  }
}

async function getAccessToken() {
  const credentials = loadCredentials();
  if (!credentials.client_email || !credentials.private_key) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT is missing client_email or private_key');
  }

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const body = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const signingInput = `${header}.${body}`;

  const privateKeyDer = credentials.private_key
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');

  const keyBuffer = Uint8Array.from(atob(privateKeyDer), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyBuffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const sigBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${signingInput}.${sigBase64}`,
  });
  const tokenText = await tokenRes.text();
  if (!tokenRes.ok) {
    throw new Error(`Google token exchange failed: ${googleErrorMessage(tokenText)}`);
  }
  const tokenData = JSON.parse(tokenText) as { access_token?: string };
  if (!tokenData.access_token) throw new Error('Google token exchange returned no access token');
  return tokenData.access_token;
}

function quoteSheet(title: string) {
  return `'${title.replace(/'/g, "''")}'`;
}

async function listTabs(token: string): Promise<SheetTab[]> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.properties(title,sheetId)`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Could not read spreadsheet: ${googleErrorMessage(text)}`);
  const data = JSON.parse(text) as { sheets?: { properties?: { title?: string; sheetId?: number } }[] };
  return (data.sheets ?? [])
    .map(sheet => ({ title: sheet.properties?.title ?? '', sheetId: sheet.properties?.sheetId ?? -1 }))
    .filter(sheet => sheet.title && sheet.sheetId >= 0);
}

async function headerRow(token: string, title: string) {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`${quoteSheet(title)}!1:1`)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) return [];
  const data = JSON.parse(await res.text()) as { values?: string[][] };
  return data.values?.[0] ?? [];
}

async function resolveTab(token: string) {
  const tabs = await listTabs(token);
  const master = tabs.find(tab => tab.title.trim().toUpperCase() === MASTER_TAB);
  if (master) return master;

  for (const tab of tabs) {
    const headers = await headerRow(token, tab.title);
    if (EXPECTED_HEADERS.every((header, index) => headers[index] === header)) return tab;
  }
  throw new Error('No signup tab found');
}

async function appendInquiry(token: string, tab: SheetTab, values: string[]) {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`${quoteSheet(tab.title)}!A:I`)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [values] }),
    }
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Sheets append failed: ${googleErrorMessage(text)}`);
  const data = JSON.parse(text) as { updates?: { updatedRange?: string } };
  return data.updates?.updatedRange ?? '';
}

function rowIndex(updatedRange: string) {
  const match = updatedRange.match(/![A-Z]+(\d+)/i);
  if (!match) return null;
  const row = Number(match[1]);
  return Number.isInteger(row) && row > 1 ? row : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentName, kidName, dob, grade, position, school, email, program } = body;
    const token = await getAccessToken();
    const tab = await resolveTab(token);
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const values = [timestamp, parentName, kidName, dob, grade, position, school, program, email].map(value =>
      value == null ? '' : String(value)
    );

    const updatedRange = await appendInquiry(token, tab, values);

    if (req.headers.get('x-inquiry-debug') === '1' && email === 'inquiry-test@example.com') {
      const row = rowIndex(updatedRange);
      const readRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(updatedRange)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const readText = await readRes.text();
      const readRow = readRes.ok ? ((JSON.parse(readText) as { values?: string[][] }).values?.[0] ?? []) : [];
      const emailMatched = readRow[8] === 'inquiry-test@example.com' && readRow[1] === 'Form Test — please ignore';
      let deleted = false;
      if (emailMatched && row) {
        const deleteRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              requests: [{
                deleteDimension: {
                  range: { sheetId: tab.sheetId, dimension: 'ROWS', startIndex: row - 1, endIndex: row },
                },
              }],
            }),
          }
        );
        deleted = deleteRes.ok;
        if (!deleteRes.ok) console.error('Test row delete failed:', await deleteRes.text());
      }
      return NextResponse.json({
        success: true,
        tab: tab.title,
        updatedRange,
        emailMatched,
        deleted,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
