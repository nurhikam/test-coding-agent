import { GATEWAY_ERRORS, GATEWAY_CONFIG } from '../gateway/gatewayConfig';

/**
 * Mock Redis Client for Rate Limiting
 */
const mockRedis = {
  storage: new Map(),
  async incr(key) {
    const val = (this.storage.get(key) || 0) + 1;
    this.storage.set(key, val);
    return val;
  },
  async expire(key, seconds) {
    // In real Redis, this sets the TTL
    return 'OK';
  },
  async get(key) {
    return this.storage.get(key);
  }
};

/**
 * Middleware for Redis-based Rate Limiting
 * Implements Fixed Window algorithm
 */
export const rateLimiter = async (req, res, next) => {
  const clientId = req.client?.clientId || req.ip;
  const key = `rate_limit:${clientId}`;
  
  try {
    const currentRequests = await mockRedis.incr(key);
    
    if (currentRequests === 1) {
      await mockRedis.expire(key, GATEWAY_CONFIG.RATE_LIMIT.WINDOW_MS / 1000);
    }

    if (currentRequests > GATEWAY_CONFIG.RATE_LIMIT.MAX_REQUESTS) {
      return res.status(GATEWAY_ERRORS.RATE_LIMIT_EXCEEDED.status).json({
        error_code: GATEWAY_ERRORS.RATE_LIMIT_EXCEEDED.code,
        message: GATEWAY_ERRORS.RATE_LIMIT_EXCEEDED.message
      });
    }

    next();
  } catch (error) {
    // Fail-open on redis error to avoid blocking traffic, but log it
    console.error('Rate limiter redis error:', error);
    next();
  }
};
