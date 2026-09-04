import { GATEWAY_ERRORS } from '../gateway/gatewayConfig';

/**
 * Middleware to validate OAuth2 Client Credentials Token
 * Simulates token validation against an Authorization Server
 */
export const validateOAuth2Token = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(GATEWAY_ERRORS.INVALID_TOKEN.status).json({
      error_code: GATEWAY_ERRORS.INVALID_TOKEN.code,
      message: GATEWAY_ERRORS.INVALID_TOKEN.message
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // In a real scenario, this would be a call to the Introspection Endpoint or JWT validation
    const isValid = await simulateTokenValidation(token);
    
    if (!isValid) {
      throw new Error('Invalid Token');
    }

    // Attach client info to request
    req.client = {
      clientId: 'corporate-client-001',
      scope: 'kyc.submit'
    };

    next();
  } catch (error) {
    return res.status(GATEWAY_ERRORS.INVALID_TOKEN.status).json({
      error_code: GATEWAY_ERRORS.INVALID_TOKEN.code,
      message: GATEWAY_ERRORS.INVALID_TOKEN.message
    });
  }
};

async function simulateTokenValidation(token) {
  // Simulate network delay and a simple token check
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo: any token longer than 20 chars is "valid"
      resolve(token.length > 20);
    }, 50);
  });
}
