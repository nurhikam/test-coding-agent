import { validateOAuth2Token } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimitMiddleware';
import { kycOrchestrator } from '../orchestrator/kycOrchestrator';
import { cobolBridgeService } from '../../services/cobolBridgeService';

/**
 * KYC Controller to handle B2B requests
 */
export const kycController = {
  submitKYC: async (req, res) => {
    try {
      const { payload } = req.body;

      if (!payload || !payload.documentImage || !payload.livenessVideo) {
        return res.status(400).json({
          error: 'Missing required payload fields: documentImage or livenessVideo'
        });
      }

      // Use COBOL Bridge for NIK Validation
      if (payload.nik) {
        const nikValidation = await cobolBridgeService.validateNIK(payload.nik);
        if (nikValidation.status === 'INVALID') {
          return res.status(422).json({
            status: 'Rejected',
            error_code: 'INVALID_NIK_FORMAT',
            message: `NIK validation failed via ${nikValidation.source}`
          });
        }
      }

      console.log('KYC Submission received for client:', req.client.clientId);
      
      // Integrate with Orchestrator
      const orchestrationResult = await kycOrchestrator.processSubmission(payload);

      if (orchestrationResult.status === 'FAILED' || orchestrationResult.status === 'ERROR') {
        return res.status(422).json({
          status: 'Rejected',
          error_code: 'KYC_PIPELINE_FAILURE',
          message: orchestrationResult.message,
          details: orchestrationResult.results
        });
      }

      return res.status(200).json({
        status: 'Success',
        request_id: `req_${Date.now()}`,
        results: orchestrationResult.results,
        message: orchestrationResult.message
      });
    } catch (error) {
      console.error('Submission error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

/**
 * Gateway Router configuration
 * This demonstrates how the middleware chain is applied to the endpoint
 */
export const kycRoutes = {
  '/v1/kyc/submit': {
    method: 'POST',
    middleware: [validateOAuth2Token, rateLimiter],
    handler: kycController.submitKYC
  }
};
