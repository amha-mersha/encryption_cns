const encryptionService = require('./encryptionService');

class EncryptionController {
  async encryptOTP(req, res) {
    try {
      const { text, key } = req.body;
      if (!text || !key) {
        return res.status(400).json({ error: 'Text and key are required' });
      }
      
      const encrypted = encryptionService.otpEncrypt(text, key);
      res.json({ encrypted });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async decryptOTP(req, res) {
    try {
      const { encryptedText, key } = req.body;
      if (!encryptedText || !key) {
        return res.status(400).json({ error: 'Encrypted text and key are required' });
      }
      
      const decrypted = encryptionService.otpDecrypt(encryptedText, key);
      res.json({ decrypted });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async encrypt3DES(req, res) {
    try {
      const { text, key } = req.body;
      if (!text || !key) {
        return res.status(400).json({ error: 'Text and key are required' });
      }
      
      const result = encryptionService.tripleDesEncrypt(text, key);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async decrypt3DES(req, res) {
    try {
      const { encryptedData, key, iv } = req.body;
      if (!encryptedData || !key || !iv) {
        return res.status(400).json({ error: 'Encrypted data, key and IV are required' });
      }
      
      const decrypted = encryptionService.tripleDesDecrypt(encryptedData, key, iv);
      res.json({ decrypted });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async encryptAES(req, res) {
    try {
      const { text, key, algorithm } = req.body;
      if (!text || !key) {
        return res.status(400).json({ error: 'Text and key are required' });
      }
      
      const result = encryptionService.aesEncrypt(text, key, algorithm);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async decryptAES(req, res) {
    try {
      const { encryptedData, key, iv, algorithm } = req.body;
      if (!encryptedData || !key || !iv) {
        return res.status(400).json({ error: 'Encrypted data, key and IV are required' });
      }
      
      const decrypted = encryptionService.aesDecrypt(encryptedData, key, iv, algorithm);
      res.json({ decrypted });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async generateKey(req, res) {
    try {
      const { algorithm, length } = req.query;
      let keyLength;
      
      if (algorithm) {
        const algorithmMap = {
          'otp': length ? parseInt(length) : 32,
          '3des': 24,
          'aes-128': 16,
          'aes-192': 24,
          'aes-256': 32
        };
        
        keyLength = algorithmMap[algorithm.toLowerCase()];
        if (!keyLength) {
          return res.status(400).json({ error: 'Invalid algorithm specified' });
        }
      } else if (length) {
        keyLength = parseInt(length);
      } else {
        keyLength = 32; // default
      }
      
      const key = encryptionService.generateKey(keyLength);
      res.json({ key });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new EncryptionController();
