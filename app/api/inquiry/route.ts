import { NextRequest, NextResponse } from 'next/server';

const SHEET_ID = '1adGVYX1uv41nVKiAWjlUUFBH3T-16aCKJAGYnT9MK40';
// Headers: Timestamp, Parent Name, Kid Name, Age, Grade, Position, Program, Email

type Credentials = {
  client_email?: string;
  private_key?: string;
};

function loadCredentials(): Credentials {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!raw) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT is not set');
  }
  return JSON.parse(raw) as Credentials;
}

function googleErrorMessage(body: string) {
  try {
    const parsed = JSON.parse(body) as {
      error?: string | { message?: string; status?: string };
      error_description?: string;
    };
    if (typeof parsed.error === 'string') {
      return parsed.error_description
        ? `${parsed.error}: ${parsed.error_description}`
        : parsed.error;
    }
    return parsed.error?.message || body.slice(0, 500);
  } catch {
    return body.slice(0, 500);
  }
}

async function getAccessToken() {
  const credentials = loadCredentials();

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  // Create JWT
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const body = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const signingInput = `${header}.${body}`;

  // Import the private key
  const privateKeyPem = credentials.private_key;
  if (!privateKeyPem || !credentials.client_email) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT is missing client_email or private_key');
  }
  const privateKeyDer = privateKeyPem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '');

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

  const jwt = `${signingInput}.${sigBase64}`;

  // Exchange for access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  const tokenText = await tokenRes.text();
  let tokenData: { access_token?: string } = {};
  try {
    tokenData = JSON.parse(tokenText) as { access_token?: string };
  } catch {
    tokenData = {};
  }
  return {
    accessToken: tokenData.access_token,
    status: tokenRes.status,
    error: tokenRes.ok ? undefined : googleErrorMessage(tokenText),
    serviceAccount: credentials.client_email,
  };
}

export async function POST(req: NextRequest) {
  const debug = req.headers.get('x-inquiry-debug') === '1';
  try {
    const body = await req.json();
    const { parentName, kidName, dob, grade, position, school, email, program, dryRun } = body;

    const token = await getAccessToken();
    if (!token.accessToken) {
      console.error('Inquiry token error:', token.error);
      if (debug) {
        return NextResponse.json({
          stage: 'token',
          status: token.status,
          message: token.error,
          serviceAccount: token.serviceAccount,
        }, { status: 500 });
      }
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    if (debug && dryRun) {
      const metaRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=properties.title,sheets.properties.title`,
        { headers: { Authorization: `Bearer ${token.accessToken}` } }
      );
      const metaText = await metaRes.text();
      const metadata = metaRes.ok ? JSON.parse(metaText) as {
        sheets?: { properties?: { title?: string } }[];
      } : undefined;
      const headers: Record<string, string[]> = {};
      const rowCounts: Record<string, number> = {};
      if (metadata?.sheets) {
        for (const sheet of metadata.sheets) {
          const title = sheet.properties?.title;
          if (!title) continue;
          const quoted = `'${title.replace(/'/g, "''")}'`;
          const headerRes = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`${quoted}!1:1`)}`,
            { headers: { Authorization: `Bearer ${token.accessToken}` } }
          );
          const headerText = await headerRes.text();
          headers[title] = headerRes.ok
            ? ((JSON.parse(headerText) as { values?: string[][] }).values?.[0] ?? [])
            : [`ERROR ${headerRes.status}: ${googleErrorMessage(headerText)}`];
          const countRes = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`${quoted}!A:A`)}?majorDimension=COLUMNS`,
            { headers: { Authorization: `Bearer ${token.accessToken}` } }
          );
          const countText = await countRes.text();
          rowCounts[title] = countRes.ok
            ? (((JSON.parse(countText) as { values?: string[][] }).values?.[0]?.length) ?? 0)
            : -1;
        }
      }
      const sheet1Res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent('Sheet1!A1')}`,
        { headers: { Authorization: `Bearer ${token.accessToken}` } }
      );
      const sheet1Text = await sheet1Res.text();
      return NextResponse.json({
        stage: 'metadata',
        status: metaRes.status,
        message: metaRes.ok ? undefined : googleErrorMessage(metaText),
        metadata,
        headers,
        rowCounts,
        sheet1: { status: sheet1Res.status, message: sheet1Res.ok ? 'ok' : googleErrorMessage(sheet1Text) },
      }, { status: metaRes.ok ? 200 : 500 });
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:I:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[timestamp, parentName, kidName, dob, grade, position, school, program, email]],
        }),
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.text();
      console.error('Sheets error:', err);
      if (debug) {
        return NextResponse.json({
          stage: 'sheets',
          status: appendRes.status,
          message: googleErrorMessage(err),
          serviceAccount: token.serviceAccount,
        }, { status: 500 });
      }
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry error:', error);
    if (debug) {
      return NextResponse.json({
        stage: 'exception',
        message: error instanceof Error ? error.message : 'Server error',
      }, { status: 500 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
