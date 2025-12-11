import app from '../server.js';

// Explicit function for /api/product to ensure Vercel registers this route.
export default function handler(req, res) {
  return app(req, res);
}
