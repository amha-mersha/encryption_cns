const {
  encryptWithPublicKey,
  decryptWithPrivateKey,
} = require("../services/rsaEncryptionService");

class RSAController {
  async encryptRSA(req, res) {
    const { plaintext, public_key } = req.body;
    try {
      const encrypted = encryptWithPublicKey(plaintext, public_key);
      res.json({ encrypted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async decryptRSA(req, res) {
    const { encrypted, private_key } = req.body;
    try {
      const decrypted = decryptWithPrivateKey(encrypted, private_key);
      res.json({ decrypted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new RSAController();
