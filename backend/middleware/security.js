const rateLimit = require('express-rate-limit');
const { securityEvent } = require('../utils/logger');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Try again in 15 minutes.' },
  keyGenerator: (req) => `${req.ip}-${req.body?.email || 'unknown'}`,
  handler: (req, res, next, options) => {
    securityEvent('rate_limit_exceeded', { ip: req.ip, email: req.body?.email, route: req.originalUrl });
    res.status(429).json(options.message);
  },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many registrations from this IP. Try again later.' },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests. Slow down.' },
});

const errorHandler = (err, req, res, _next) => {
  securityEvent('server_error', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    status: err.status || 500,
  });
  const status = err.status || 500;
  res.status(status).json({
    message: status === 500 ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { detail: err.message }),
  });
};

function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = { authLimiter, registerLimiter, apiLimiter, errorHandler, asyncHandler };
