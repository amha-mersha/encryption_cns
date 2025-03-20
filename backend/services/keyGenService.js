const crypto = require("crypto");

module.exports = {
  generateAESKey: (length = 32) => {
    return crypto.randomBytes(length);
  },

  generate3DESKey: () => {
    return crypto.randomBytes(24); // 3DES key must be 24 bytes
  },

  generateOTPKey: (length = 64) => {
    return crypto.randomBytes(length);
  },
};
