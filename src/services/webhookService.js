const API_BASE_URL = '/api/corporate/webhook';

export const webhookService = {
  updateConfig: async (config) => {
    // Simulate API call
    console.log('Updating webhook configuration:', config);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config.url && config.secret) {
          resolve({ status: 200, message: 'Webhook configuration updated successfully' });
        } else {
          reject({ status: 400, message: 'Invalid configuration' });
        }
      }, 1000);
    });
  },

  getConfig: async () => {
    // Simulate fetching current config
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: 'https://example.com/webhook',
          secret: 'a-very-long-and-secure-secret-token-32-chars',
        });
      }, 1000);
    });
  }
};
