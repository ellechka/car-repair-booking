import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Middleware to authenticate JWT token from the request headers
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    const error = new Error('Missing token');
    error.status = 401;
    return next(error);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    const error = new Error('Invalid or expired token');
    error.status = 403;
    next(error);
  }
};

export {authenticateToken};
