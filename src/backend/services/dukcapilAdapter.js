/**
 * Dukcapil Adapter Service
 * Proxies requests to the external Dukcapil API for NIK validation
 */
export const dukcapilAdapter = {
  verifyNIK: async (nik) => {
    try {
      // In a real scenario, this would be a call to the external Dukcapil API
      // URL would be retrieved from environment variables or config
      const response = await fetch('https://api.dukcapil.kemendagri.go.id/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer DUKCAPIL_INTERNAL_TOKEN'
        },
        body: JSON.stringify({ nik })
      });

      if (!response.ok) {
        if (response.status === 503 || response.status === 504) {
          throw { code: 'ERR-DUK-001', message: 'Service unavailable' };
        }
        throw { code: 'ERR-DUK-000', message: 'Unknown Dukcapil error' };
      }

      return await response.json();
    } catch (error) {
      if (error.code === 'ERR-DUK-001') {
        throw error;
      }
      // Treat network errors as service unavailable
      throw { code: 'ERR-DUK-001', message: 'Service unavailable' };
    }
  }
};
