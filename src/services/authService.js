const authApi = {
  login: async (username, password) => {
    // Mocking AD BNI Integration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'password') {
          resolve({ success: true, requiresMfa: true, user: { username, role: 'Super Admin' } });
        } else {
          reject(new Error('Invalid AD BNI credentials'));
        }
      }, 1000);
    });
  },
  verifyMfa: async (code) => {
    // Mocking TOTP verification
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve({ success: true, token: 'mock-jwt-token' });
        } else {
          reject(new Error('Invalid MFA code'));
        }
      }, 1000);
    });
  }
};

export default authApi;
