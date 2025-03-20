const crypto = require("crypto");

module.exports = {
  encryptAES: (data, key) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted };
  },

  decryptAES: (data, key, iv) => {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      key,
      Buffer.from(iv, "hex"),
    );
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  },

  encrypt3DES: (data, key) => {
    const iv = crypto.randomBytes(8);
    const cipher = crypto.createCipheriv("des-ede3-cbc", key, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted };
  },

  decrypt3DES: (data, key, iv) => {
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
    if (data.length !== key.length)
      throw new Error("Data and key must be of the same length for OTP");
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
