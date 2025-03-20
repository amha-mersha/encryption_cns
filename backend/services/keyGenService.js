const crypto = require("crypto");

module.exports = {
  generateAESKey: (length = 256) => {
    const byteLength = length / 8;
    if (![16, 24, 32].includes(byteLength)) {
      throw new Error("AES key length must be 128, 192, or 256 bits");
    }
    return crypto.randomBytes(byteLength);
  },

  generate3DESKey: () => {
    return crypto.randomBytes(24);
  },

  generateOTPKey: (length) => {
    return crypto.randomBytes(length);
  },
};
