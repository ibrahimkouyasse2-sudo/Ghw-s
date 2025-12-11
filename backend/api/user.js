import app from '../server.js';

// Explicit function for /user -> forward to Express at /api/user
export default function handler(req, res) {
  if (!req.url.startsWith('/api')) {
    req.url = '/api/user' + (req.url === '/' ? '' : req.url);
  }
  return app(req, res);
}
