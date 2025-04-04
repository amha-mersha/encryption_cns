const {
  encryptWithPublicKey,
  decryptWithPrivateKey,
} = require("../services/rsaEncryptionService");

class RSAController {
  async encryptRSA(req, res) {
    const { plaintext } = req.body;
    try {
      const encrypted = encryptWithPublicKey(plaintext);
      res.json({ encrypted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async decryptRSA(req, res) {
    const { encrypted } = req.body;
    try {
      const decrypted = decryptWithPrivateKey(encrypted);
      res.json({ decrypted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new RSAController();
