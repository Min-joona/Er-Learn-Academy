const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: ['req.headers.authorization', 'req.body.password', 'req.body.currentPassword', 'req.body.newPassword', 'password', 'token'],
    censor: '[REDACTED]',
  },
  serializers: {
    req: (r) => ({ method: r.method, url: r.url, ip: r.ip }),
    err: pino.stdSerializers.err,
  },
  transport:
    process.env.NODE_ENV !== 'production'
      ? { target: 'pino/file', options: { destination: 1 } }
      : undefined,
});

function securityEvent(event, meta = {}) {
  logger.info({ event, ...meta }, `SECURITY: ${event}`);
}

module.exports = { logger, securityEvent };
