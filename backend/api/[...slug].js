// backend/api/[...slug].js
// Catch-all forwarder for `/api/*` paths. Routes to local handlers in this folder
// so we avoid importing files outside the function bundle (like ../server.js).
export default async function handler(req, res) {
  try {
    let url = req.url || '/';
    // Strip query
    url = url.split('?')[0];
    // If called directly as /api/..., remove the /api prefix
    if (url.startsWith('/api')) url = url.slice(4) || '/';

    // Normalize trailing slash
    if (url !== '/' && url.endsWith('/')) url = url.slice(0, -1);

    // Route mapping
    if (url === '/product/list' || url === '/product_list') {
      const mod = await import('./product_list.js');
      return mod.default(req, res);
    }

    if (url === '/product' || url.startsWith('/product/')) {
      const mod = await import('./product.js');
      return mod.default(req, res);
    }

    if (url === '/user' || url.startsWith('/user/')) {
      const mod = await import('./user.js');
      return mod.default(req, res);
    }

    // Fallback: not found
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: false, message: 'Not found' }));
  } catch (err) {
    console.error('catch-all forwarder error', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: false, error: String(err) }));
  }
}
