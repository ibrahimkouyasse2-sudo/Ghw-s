// backend/api/[...slug].js
import app from '../server.js';

// Catch-all wrapper: map any incoming path to /api{path} so Express routes match
export default function handler(req, res) {
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + (req.url === '/' ? '' : req.url);
  }
  return app(req, res);
}
