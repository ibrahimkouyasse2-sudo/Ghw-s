import connectDB from './config/mongodb.js';
import userModel from './models/userModel.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ ok: false, message: 'Method Not Allowed' }));
  }
  try {
    await connectDB();
  } catch (err) {
    console.error('user handler db connect error', err && err.message ? err.message : err);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).end(JSON.stringify({ success: true, users: [], dbAvailable: false, message: 'DB unavailable' }));
  }

  try {
    const users = await userModel.find().limit(100).lean();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).end(JSON.stringify({ success: true, users, dbAvailable: true }));
  } catch (err) {
    console.error('user handler query error', err);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).end(JSON.stringify({ success: true, users: [], dbAvailable: false, message: 'DB query failed' }));
  }
}
