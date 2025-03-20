const encryptionService = require("../services/encryptionService");
const keyGenService = require("../services/keyGenService");

module.exports = {
  encryptData: (req, res) => {
    const { algorithm, data, key } = req.body;

    if (!key || !key.value || !key.length) {
      return res
        .status(400)
        .json({ error: "Key object with value and length is required" });
    }

    let encryptionResult;

    try {
      switch (algorithm) {
        case "AES":
          if (![128, 192, 256].includes(key.length)) {
            return res
              .status(400)
              .json({ error: "AES key must be 128, 192, or 256 bits" });
          }
          const aesKey = Buffer.from(key.value, "hex");
          if (
            ![16, 24, 32].includes(aesKey.length) ||
            aesKey.length * 8 !== key.length
          ) {
            return res.status(400).json({
              error:
                "AES key must be 16, 24, or 32 bytes when decoded from hex or there is a mistmach between the length provided and the actual length",
            });
          }
          encryptionResult = encryptionService.encryptAES(data, aesKey);
          break;
        case "3DES":
          if (key.length !== 192) {
            return res.status(400).json({
              error: "3DES key must be 192 bits (168 bits effective)",
            });
          }
          const desKey = Buffer.from(key.value, "hex");
          if (desKey.length !== 24 || desKey.length * 8 !== key.length) {
            return res.status(400).json({
              error:
                "3DES key must be 24 bytes (192 bits) when decoded from hex or there is a mistmach between the length provided and the actual length",
            });
          }
          encryptionResult = encryptionService.encrypt3DES(data, desKey);
          break;
        case "OTP":
          if (key.length !== data.length * 8) {
            return res
              .status(400)
              .json({ error: "OTP key length must match data length in bits" });
          }
          const otpKey = Buffer.from(key.value, "hex");
          encryptionResult = encryptionService.encryptOTP(data, otpKey);
          break;
        default:
          return res.status(400).json({ error: "Invalid algorithm" });
      }
      res.json({ encryptedData: encryptionResult });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  decryptData: (req, res) => {
    const { algorithm, data, key, iv } = req.body;

    if (!key) {
      return res.status(400).json({ error: "Key is required" });
    }

    let decryptedResult;

    try {
      switch (algorithm) {
        case "AES":
          const aesKey = Buffer.from(key, "hex");
          decryptedResult = encryptionService.decryptAES(data, aesKey, iv);
          break;
        case "3DES":
          const desKey = Buffer.from(key, "hex");
          decryptedResult = encryptionService.decrypt3DES(data, desKey, iv);
          break;
        case "OTP":
          const otpKey = Buffer.from(key, "hex");
          decryptedResult = encryptionService.decryptOTP(data, otpKey);
          break;
        default:
          return res.status(400).json({ error: "Invalid algorithm" });
      }
      res.json({ decryptedData: decryptedResult });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  generateKey: (req, res) => {
    const { algorithm, length } = req.body;

    let generatedKey;

    try {
      switch (algorithm) {
        case "AES":
          if (length && ![128, 192, 256].includes(length)) {
            return res
              .status(400)
              .json({ error: "AES key length must be 128, 192, or 256 bits" });
          }
          generatedKey = keyGenService.generateAESKey(length || 256);
          break;

        case "3DES":
          if (length && length !== 192) {
            return res
              .status(400)
              .json({ error: "3DES key length must be 192 bits" });
          }
          generatedKey = keyGenService.generate3DESKey();
          break;

        case "OTP":
          if (!length || isNaN(length) || length <= 0) {
            return res
              .status(400)
              .json({ error: "OTP key length must be a positive number" });
          }
          generatedKey = keyGenService.generateOTPKey(Math.ceil(length / 8));
          break;

        default:
          return res
            .status(400)
            .json({ error: "Invalid algorithm for key generation" });
      }
      res.json({ generatedKey: generatedKey.toString("hex") });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
