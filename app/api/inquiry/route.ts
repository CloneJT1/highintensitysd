import { NextRequest, NextResponse } from 'next/server';

const SHEET_ID = '1adGVYX1uv41nVKiAWjlUUFBH3T-16aCKJAGYnT9MK40';
// The signup tab was renamed; there is no tab called Sheet1.
const MASTER_TAB = 'ORIGINAL SIGN UP';
const EXPECTED_HEADERS = ['Timestamp', 'Parent Name', 'Kid Name', 'Age', 'Grade', 'Position', 'School', 'Program', 'Email'];

// Override with INQUIRY_ALERT_EMAILS (comma-separated) in the Vercel project settings.
const DEFAULT_ALERT_RECIPIENTS = [
  'director@highintensityfootball.com',
  'tamoe33@gmail.com',
  'ctaumoep@qualcomm.com',
  'highintensitysd@gmail.com',
  'highintensitycoachab@gmail.com',
];
const DEFAULT_FROM_EMAIL = 'High Intensity Football <inquiries@highintensityfootball.com>';

type SheetTab = { title: string };

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
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.properties.title`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Could not read spreadsheet: ${googleErrorMessage(text)}`);
  const data = JSON.parse(text) as { sheets?: { properties?: { title?: string } }[] };
  return (data.sheets ?? [])
    .map(sheet => ({ title: sheet.properties?.title ?? '' }))
    .filter(sheet => sheet.title);
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

function oneLine(value: unknown) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function alertRecipients() {
  const configured = process.env.INQUIRY_ALERT_EMAILS;
  if (configured == null || configured.trim() === '') return [...DEFAULT_ALERT_RECIPIENTS];
  return configured.split(/[,;\s]+/).map(item => item.trim()).filter(isEmail);
}

async function sendInquiryAlert(fields: { label: string; value: string }[], replyTo: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Inquiry email skipped: RESEND_API_KEY is not set');
    return;
  }

  const to = alertRecipients();
  if (to.length === 0) {
    console.error('Inquiry email skipped: INQUIRY_ALERT_EMAILS has no valid addresses');
    return;
  }

  const kidName = fields.find(field => field.label === "Kid's Name")?.value || 'Unknown athlete';
  const parentName = fields.find(field => field.label === 'Parent Name')?.value || '';
  const subject = `${/\btest\b/i.test(parentName) ? 'TEST — ' : ''}New High Intensity inquiry: ${kidName}`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL,
      to,
      reply_to: isEmail(replyTo) ? replyTo : undefined,
      subject,
      text: ['A new inquiry was submitted on the High Intensity website.', '', ...fields.map(field => `${field.label}: ${field.value || '—'}`)].join('\n'),
    }),
  });

  if (!res.ok) {
    console.error('Inquiry email failed:', res.status, (await res.text()).slice(0, 500));
  }
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

    await appendInquiry(token, tab, values);

    try {
      await sendInquiryAlert([
        { label: 'Timestamp', value: oneLine(timestamp) },
        { label: 'Parent Name', value: oneLine(parentName) },
        { label: "Kid's Name", value: oneLine(kidName) },
        { label: 'Date of Birth', value: oneLine(dob) },
        { label: 'Grade', value: oneLine(grade) },
        { label: 'Position', value: oneLine(position) },
        { label: 'Current School', value: oneLine(school) },
        { label: 'Interested In', value: oneLine(program) },
        { label: 'Email', value: oneLine(email) },
      ], oneLine(email));
    } catch (error) {
      console.error('Inquiry email failed:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
