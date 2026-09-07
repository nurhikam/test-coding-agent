const reviewQueueApi = {
  fetchPendingCases: async (page = 1, status = 'PENDING_MANUAL_REVIEW') => {
    // Mocking API call to get cases with PENDING_MANUAL_REVIEW status
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = Array.from({ length: 25 }, (_, i) => ({
          id: `req-${1000 + i}`,
          customerName: `Customer ${i + 1}`,
          nik: `320101${(100000000 + i).toString()}`,
          submittedAt: new Date(Date.now() - i * 3600000).toISOString(),
          status: 'PENDING_MANUAL_REVIEW',
          score: (Math.random() * (0.84 - 0.70) + 0.70).toFixed(2)
        }));
        
        const perPage = 10;
        const start = (page - 1) * perPage;
        const end = start + perPage;

        resolve({
          data: mockData.slice(start, end),
          total: mockData.length,
          totalPages: Math.ceil(mockData.length / perPage)
        });
      }, 800);
    });
  },

  fetchCaseDetails: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id,
            customerName: 'John Doe',
            nik: '3201010000000001',
            submittedAt: new Date().toISOString(),
            status: 'PENDING_MANUAL_REVIEW',
            score: '0.85',
            ktpImageUrl: 'https://via.placeholder.com/600x400?text=KTP+Photo',
            selfieImageUrl: 'https://via.placeholder.com/600x400?text=Selfie+Photo',
            extractedData: {
              name: 'John Doe',
              nik: '3201010000000001',
              birthDate: '1990-01-01',
              address: 'Jl. Sudirman No. 1, Jakarta'
            }
          }
        });
      }, 500);
    });
  },

  approveCase: async (id, userRole) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userRole !== 'REVIEWER' && userRole !== 'SUPER_ADMIN') {
          reject({ code: 'ERR-AUTH-001', message: 'Unauthorized: Insufficient permissions' });
        } else {
          resolve({ success: true, final_decision: 'APPROVED', reason_code: 'VALID_DOCS' });
        }
      }, 500);
    });
  },

  rejectCase: async (id, reasonCode, userRole) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userRole !== 'REVIEWER' && userRole !== 'SUPER_ADMIN') {
          reject({ code: 'ERR-AUTH-001', message: 'Unauthorized: Insufficient permissions' });
        } else {
          resolve({ success: true, final_decision: 'REJECTED', reason_code: reasonCode });
        }
      }, 500);
    });
  },

  requestReupload: async (id, field) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 500);
    });
  }
};

export default reviewQueueApi;
