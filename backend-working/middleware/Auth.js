import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized login again" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decode.id;
    next && next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth) return res.status(401).json({ success: false, message: 'Unauthorized' });
  const token = auth.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
