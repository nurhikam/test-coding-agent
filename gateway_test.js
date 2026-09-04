/**
 * Integration Tests for API Gateway Error Responses
 */
import { validateOAuth2Token } from './src/backend/middleware/authMiddleware';
import { rateLimiter } from './src/backend/middleware/rateLimitMiddleware';
import { GATEWAY_ERRORS } from './src/backend/gateway/gatewayConfig';

async function testGatewayErrors() {
  console.log('Running API Gateway Error Validation Tests...');

  // Mock Request/Response
  const mockRes = {
    status: (code) => {
      this.statusCode = code;
      return this;
    },
    json: (body) => {
      console.log(`Response [${this.statusCode}]:`, JSON.stringify(body));
      return body;
    }
  };
  const mockNext = () => console.log('Next called');

  // Test 1: ERR-GW-001 (Invalid Token)
  console.log('\\nTest 1: Invalid Token');
  const req1 = { headers: { authorization: 'Bearer short-token' } };
  await validateOAuth2Token(req1, mockRes, mockNext);
  
  // Test 2: ERR-GW-002 (Rate Limit Exceeded)
  console.log('\\nTest 2: Rate Limit Exceeded');
  const req2 = { 
    headers: { authorization: 'Bearer a-very-long-valid-token-that-passes-validation' },
    client: { clientId: 'test-client' },
    ip: '127.0.0.1'
  };
  
  // Simulate exceeding limit
  for(let i = 0; i < 101; i++) {
    await rateLimiter(req2, mockRes, mockNext);
  }
}

testGatewayErrors().catch(console.error);
