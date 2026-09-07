const ocrService = {
  extract: async (imageUrl) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!imageUrl) {
          reject({ code: 'ERR-OCR-002', message: 'Invalid Document' });
        } else if (imageUrl.includes('low_quality')) {
          reject({ code: 'ERR-OCR-001', message: 'Low Quality' });
        } else {
          resolve({
            nik: '1234567890123456',
            full_name: 'John Doe',
            score: 0.95,
          });
        }
      }, 1000);
    });
  },
};

export default ocrService;
