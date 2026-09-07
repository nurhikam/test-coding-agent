const livenessService = {
  verify: async (videoUrl) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!videoUrl) {
          reject({ code: 'ERR-LIV-002', message: 'Face not detected' });
        } else if (videoUrl.includes('short')) {
          reject({ code: 'ERR-LIV-001', message: 'Video too short' });
        } else {
          resolve({
            status: 'live',
            confidence: 0.98,
          });
        }
      }, 1000);
    });
  },
};

export default livenessService;
