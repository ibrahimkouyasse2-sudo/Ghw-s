import app from '../server.js';

// Explicit function for /product -> forward to Express at /api/product
export default function handler(req, res) {
  // Ensure Express sees the path under /api
  if (!req.url.startsWith('/api')) {
    req.url = '/api/product' + (req.url === '/' ? '' : req.url);
  }
  return app(req, res);
}
