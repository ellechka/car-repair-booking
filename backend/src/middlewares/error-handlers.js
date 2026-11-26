import {validationResult} from 'express-validator';

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); 
};

// Error handler middleware for Express
const errorHandler = (err, req, res, next) => {
  // duplicate email from the UNIQUE key in the users table
  if (err.code === 'ER_DUP_ENTRY') {
    err.status = 409;
    err.message = 'Email is already registered';
  }
  if (!err.status) {
    console.error(err);
  }
  res.status(err.status || 500); 
  res.json({
    error: {
      message: err.status ? err.message : 'Internal server error',
      status: err.status || 500,
    },
  });
};

// Middleware to handle validation errors from express-validator
const validationErrors = (req, res, next) => {
  // Check for validation errors in the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`)
      .join(', ');
    const error = new Error(messages);
    error.status = 400;
    next(error);
    return;
  }
  next();
};

export {notFoundHandler, errorHandler, validationErrors};
