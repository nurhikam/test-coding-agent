const encryptionService = {
  encrypt: async (plainText) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!plainText) {
          reject({ code: 'ERR-SEC-001', message: 'Security processing error: No text to encrypt' });
        } else {
          resolve(`enc_aes256gcm_${Buffer.from(plainText).toString('base64')}`);
        }
      }, 1000);
    });
  },
  decrypt: async (cipherText) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!cipherText || !cipherText.startsWith('enc_aes256gcm_')) {
          reject({ code: 'ERR-SEC-001', message: 'Security processing error: Invalid cipher text' });
        } else {
          const base64Part = cipherText.replace('enc_aes256gcm_', '');
          resolve(Buffer.from(base64Part, 'base64').toString('utf8'));
        }
      }, 1000);
    });
  },
};

export default encryptionService;
