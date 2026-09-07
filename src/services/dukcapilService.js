const dukcapilService = {
  verify: async (nik) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!nik) {
          reject({ code: 'ERR-DUK-002', message: 'NIK is required' });
        } else if (nik.includes('unavailable')) {
          reject({ code: 'ERR-DUK-001', message: 'Service unavailable' });
        } else {
          resolve({
            status: 'valid',
            data: {
              nik: nik,
              full_name: 'Budi Santoso',
              address: 'Jl. Merdeka No. 1, Jakarta',
            },
          });
        }
      }, 1000);
    });
  },
};

export default dukcapilService;
