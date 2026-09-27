// Vercel serverless function: POST /api/sign
//
// Returns a short-lived Cloudinary upload signature so the browser can upload
// straight to Cloudinary without ever seeing the API secret. The secret stays
// in server environment variables (see .env.example).
//
// Only `folder` and `timestamp` are signed, so a caller can't choose a
// public_id, overwrite existing files, or attach other upload options.
// Cloudinary rejects signatures older than one hour.

const crypto = require('crypto');

const FOLDER = 'voice-postcards';

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin fetches may omit Origin
  try {
    return new URL(origin).host === req.headers.host;
  } catch (_) {
    return false;
  }
}

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!sameOrigin(req)) {
    return res.status(403).json({ error: 'Cross-origin signing requests are not allowed.' });
  }

  const {
    CLOUDINARY_CLOUD_NAME: cloudName,
    CLOUDINARY_API_KEY: apiKey,
    CLOUDINARY_API_SECRET: apiSecret,
  } = process.env;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Upload signing is not configured on the server.' });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const params = { folder: FOLDER, timestamp };
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  const signature = crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');

  return res.status(200).json({ cloudName, apiKey, timestamp, folder: FOLDER, signature });
};
