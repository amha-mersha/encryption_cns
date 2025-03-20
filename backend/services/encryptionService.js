const crypto = require("crypto");

module.exports = {
  encryptAES: (data, key) => {
    let aesMode;
    switch (key.length * 8) {
      case 128:
        aesMode = "aes-128-cbc";
        break;
      case 192:
        aesMode = "aes-192-cbc";
        break;
      case 256:
        aesMode = "aes-256-cbc";
        break;
      default:
        throw new Error("Invalid AES key length");
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(aesMode, key, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted };
  },

  decryptAES: (data, key, iv) => {
    let aesMode;
    switch (key.length * 8) {
      case 128:
        aesMode = "aes-128-cbc";
        break;
      case 192:
        aesMode = "aes-192-cbc";
        break;
      case 256:
        aesMode = "aes-256-cbc";
        break;
      default:
        throw new Error("Invalid AES key length");
    }

    const decipher = crypto.createDecipheriv(
      aesMode,
      key,
      Buffer.from(iv, "hex"),
    );
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  },

  encrypt3DES: (data, key) => {
    if (key.length !== 24) {
      throw new Error("3DES key must be 24 bytes (192 bits)");
    }

    const iv = crypto.randomBytes(8); // 3DES block size is 8 bytes
    const cipher = crypto.createCipheriv("des-ede3-cbc", key, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted };
  },

  decrypt3DES: (data, key, iv) => {
    if (key.length !== 24) {
      throw new Error("3DES key must be 24 bytes (192 bits)");
    }

    const decipher = crypto.createDecipheriv(
      "des-ede3-cbc",
      key,
      Buffer.from(iv, "hex"),
    );
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  },

  encryptOTP: (data, key) => {
    if (key.length !== data.length) {
      throw new Error("OTP key length must match data length in bytes");
    }

    let encrypted = "";
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ key[i]);
    }
    return encrypted;
  },

  decryptOTP: (data, key) => {
    return this.encryptOTP(data, key);
  },
};
