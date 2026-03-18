export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body;

    const serviceAccount = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    const token = await getAccessToken(serviceAccount);
    const sheetId = process.env.GOOGLE_SHEET_ID;

    const headers = [
      'תאריך הרשמה', 'שם מלא', 'טלפון', 'אימייל', 'סטטוס',
      'מוסד / מקום עבודה', 'עיר', 'אתגרים', 'תפקיד / חוזקה',
      'יש רעיון?', 'תיאור הרעיון', 'רוצה להוביל?', 'העדפת צוות',
      'שם שותף', 'וובינר 1', 'וובינר 2', 'זמן מועדף'
    ];

    const checkRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:Q1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const checkData = await checkRes.json();
    const isEmpty = !checkData.values || checkData.values.length === 0;

    const rows = [];
    if (isEmpty) rows.push(headers);

    const now = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });
    rows.push([
      now,
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.status || '',
      data.institution || '',
      data.city || '',
      Array.isArray(data.challenges) ? data.challenges.join(', ') : (data.challenges || ''),
      data.role || '',
      data.hasIdea || '',
      data.ideaDescription || '',
      data.wantsToLead || '',
      data.teamPreference || '',
      data.partnerName || '',
      data.webinar1 ? 'כן' : 'לא',
      data.webinar2 ? 'כן' : 'לא',
      data.preferredTime || '',
    ]);

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:Q1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: rows }),
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.json();
      console.error('Sheets API error:', err);
      return res.status(500).json({ error: 'Failed to write to sheet' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}

async function getAccessToken({ client_email, private_key }) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const jwt = await signJwt(payload, private_key);

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error('Failed to get access token: ' + JSON.stringify(tokenData));
  return tokenData.access_token;
}

async function signJwt(payload, privateKeyPem) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const encode = (obj) => btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const signingInput = `${encode(header)}.${encode(payload)}`;

  const keyData = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '');

  const binaryKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', binaryKey.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const sigBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${signingInput}.${sigBase64}`;
}
