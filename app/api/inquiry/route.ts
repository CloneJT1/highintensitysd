import { NextRequest, NextResponse } from 'next/server';

const SHEET_ID = '1adGVYX1uv41nVKiAWjlUUFBH3T-16aCKJAGYnT9MK40';
// Headers: Timestamp, Parent Name, Kid Name, Age, Grade, Position, Program, Email

async function getAccessToken() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');
  
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
  
  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentName, kidName, age, grade, position, email, program } = body;

    const token = await getAccessToken();
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:G:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[timestamp, parentName, kidName, age, grade, position, program, email]],
        }),
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.text();
      console.error('Sheets error:', err);
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
