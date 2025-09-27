// backend/src/middleware/auth.middleware.js
const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. No token provided.' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }

  req.user = decoded;
  next();
};

module.exports = authMiddleware;