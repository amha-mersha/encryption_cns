const encryptionService = require("../services/encryptionService");
const keyGenService = require("../services/keyGenService");

module.exports = {
  encryptData: (req, res) => {
    const { algorithm, data, key } = req.body;

    if (!key) {
      return res.status(400).json({ error: "Key is required" });
    }

    let encryptionResult;

    try {
      switch (algorithm) {
        case "AES":
          const aesKey = Buffer.from(key, "hex");
          encryptionResult = encryptionService.encryptAES(data, aesKey);
          break;
        case "3DES":
          const desKey = Buffer.from(key, "hex");
          encryptionResult = encryptionService.encrypt3DES(data, desKey);
          break;
        case "OTP":
          const otpKey = Buffer.from(key, "hex");
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
          generatedKey = keyGenService.generateAESKey();
          break;
        case "3DES":
          generatedKey = keyGenService.generate3DESKey();
          break;
        case "OTP":
          if (!length || isNaN(length) || length <= 0) {
            return res
              .status(400)
              .json({ error: "OTP key length must be a positive number" });
          }
          generatedKey = keyGenService.generateOTPKey(parseInt(length, 10));
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
