const webhookService = {
  updateConfig: async (config) => {
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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: 'https://example.com/webhook',
          secret: 'a-very-long-and-secure-secret-token-32-chars',
        });
      }, 1000);
    });
  },

  sendNotification: async (callbackUrl, payload) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!callbackUrl) {
          reject({ code: 'ERR-WH-002', message: 'Callback URL missing' });
        } else if (callbackUrl.includes('fail')) {
          reject({ code: 'ERR-WH-001', message: 'Max retries exceeded' });
        } else {
          const signature = 'hmac_sha256_mock_signature';
          resolve({
            status: 'sent',
            signature,
            payload,
          });
        }
      }, 1000);
    });
  },

  calculateRetryInterval: (attempt) => {
    const intervals = [5 * 60 * 1000, 15 * 60 * 1000, 60 * 60 * 1000];
    return intervals[attempt] || intervals[intervals.length - 1];
  }
};

export default webhookService;
