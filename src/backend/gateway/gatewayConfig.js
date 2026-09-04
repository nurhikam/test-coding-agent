/**
 * API Gateway Constants and Error Codes
 */
export const GATEWAY_ERRORS = {
  INVALID_TOKEN: {
    code: 'ERR-GW-001',
    message: 'Invalid or expired token',
    status: 401
  },
  RATE_LIMIT_EXCEEDED: {
    code: 'ERR-GW-002',
    message: 'Rate limit exceeded. Please try again later.',
    status: 429
  },
  INTERNAL_ERROR: {
    code: 'ERR-GW-000',
    message: 'Internal Gateway Error',
    status: 500
  }
};

export const GATEWAY_CONFIG = {
  RATE_LIMIT: {
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: 100
  },
  OAUTH2: {
    ISSUER: 'https://auth.bni.co.id',
    AUDIENCE: 'kyc-b2b-api'
  }
};
