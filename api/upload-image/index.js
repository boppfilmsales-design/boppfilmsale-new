// ============================================================
// Upload Image API — uses Telegraph (by Telegram) as free image host
// POST /api/upload-image  (multipart/form-data with field "image")
// Returns: { success, url, error }
// ============================================================
const https = require('https');

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    // Read the raw body as Buffer (multipart including boundary)
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const rawBody = Buffer.concat(buffers);

    // Forward to Telegraph (by Telegram) — free image hosting
    const telegraphUrl = await uploadToTelegraph(rawBody, req.headers['content-type']);

    return res.status(200).json({ success: true, url: telegraphUrl });
  } catch (e) {
    console.error('Upload error:', e.message);
    return res.status(500).json({ success: false, error: e.message });
  }
};

function uploadToTelegraph(body, contentType) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'telegra.ph',
      path: '/upload',
      method: 'POST',
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (Array.isArray(result) && result[0] && result[0].src) {
            resolve('https://telegra.ph' + result[0].src);
          } else if (result.error) {
            reject(new Error(result.error));
          } else {
            reject(new Error('Unexpected Telegraph response: ' + data));
          }
        } catch (e) {
          reject(new Error('Parse error: ' + e.message + ' body: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
