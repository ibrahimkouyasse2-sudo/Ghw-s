import app from '../backend/server.js';

// Top-level Vercel serverless wrapper.
// This ensures that requests to /api/* are handled by the Express app
// exported from backend/server.js regardless of Vercel project root.

export default function handler(req, res) {
  return app(req, res);
}
