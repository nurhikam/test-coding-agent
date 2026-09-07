const reportingService = {
  getAnalytics: async (timeRange = '24h') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          metrics: {
            successRate: '92.5%',
            totalVolume: 15420,
            avgLatency: '2.4s',
            pendingCases: 142,
          },
          trends: [
            { timestamp: '2026-09-06T00:00:00Z', volume: 450, successRate: 0.91 },
            { timestamp: '2026-09-06T06:00:00Z', volume: 600, successRate: 0.93 },
            { timestamp: '2026-09-06T12:00:00Z', volume: 800, successRate: 0.94 },
            { timestamp: '2026-09-06T18:00:00Z', volume: 500, successRate: 0.92 },
          ],
          lastUpdated: new Date().toISOString(),
        });
      }, 1000);
    });
  },
};

export default reportingService;
