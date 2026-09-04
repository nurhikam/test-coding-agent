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
  }
};

export default reviewQueueApi;
