import app from '../server.js';

// Vercel will route any /api/* request here. We simply forward the request to the
// Express `app` instance. Express is compatible with the Node (req, res) signature.

export default function handler(req, res) {
  return app(req, res);
}
