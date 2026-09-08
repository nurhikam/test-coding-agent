import { dukcapilAdapter } from '../services/dukcapilAdapter';
import { GATEWAY_ERRORS } from '../gateway/gatewayConfig';

/**
 * Dukcapil Controller
 * Handles requests for NIK verification
 */
export const dukcapilController = {
  verifyNIK: async (req, res) => {
    try {
      const { nik } = req.body;

      if (!nik) {
        return res.status(400).json({
          error: 'Missing required field: nik'
        });
      }

      const result = await dukcapilAdapter.verifyNIK(nik);

      return res.status(200).json({
        status: result.status,
        data: result.data
      });
    } catch (error) {
      if (error.code === 'ERR-DUK-001') {
        return res.status(503).json({
          error_code: 'ERR-DUK-001',
          message: error.message
        });
      }
      
      return res.status(500).json({
        error_code: GATEWAY_ERRORS.INTERNAL_ERROR.code,
        message: 'Internal Server Error'
      });
    }
  }
};

/**
 * Dukcapil Router configuration
 */
export const dukcapilRoutes = {
  '/internal/dukcapil/verify': {
    method: 'POST',
    middleware: [],
    handler: dukcapilController.verifyNIK
  }
};
