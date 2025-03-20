const crypto = require("crypto");

module.exports = {
  generateAESKey: () => {
    return crypto.randomBytes(32);
  },

  generate3DESKey: () => {
    return crypto.randomBytes(24);
  },

  generateOTPKey: (length) => {
    return crypto.randomBytes(length);
  },
};
