const matchingService = {
  compare: async (ktpUrl, selfieUrl) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!ktpUrl || !selfieUrl) {
          reject({ code: 'ERR-MATCH-001', message: 'Missing input images' });
        } else {
          const matchScore = 0.92;
          resolve({
            match_score: matchScore,
            result: matchScore >= 0.85 ? 'verified' : 'manual_review',
          });
        }
      }, 1000);
    });
  },
};

export default matchingService;
