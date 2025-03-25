const crypto = require('crypto');

class EncryptionService {
  // OTP (One-Time Pad) Encryption
  otpEncrypt(text, key) {
    if (key.length !== text.length) {
      throw new Error('Key length must match text length for OTP');
    }
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i);
      result += String.fromCharCode(charCode);
    }
    
    return Buffer.from(result).toString('base64');
  }

  otpDecrypt(encryptedText, key) {
    const text = Buffer.from(encryptedText, 'base64').toString('binary');
    
    if (key.length !== text.length) {
      throw new Error('Key length must match encrypted text length for OTP');
    }
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i);
      result += String.fromCharCode(charCode);
    }
    
    return result;
  }

  // 3DES Encryption
  tripleDesEncrypt(text, key) {
    if (key.length !== 24) {
      throw new Error('3DES requires a 24-byte key');
    }
    
    const iv = crypto.randomBytes(8);
    const cipher = crypto.createCipheriv('des-ede3-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return {
      iv: iv.toString('base64'),
      encryptedData: encrypted
    };
  }

  tripleDesDecrypt(encryptedData, key, iv) {
    if (key.length !== 24) {
      throw new Error('3DES requires a 24-byte key');
    }
    
    const decipher = crypto.createDecipheriv(
      'des-ede3-cbc', 
      Buffer.from(key), 
      Buffer.from(iv, 'base64')
    );
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  // AES Encryption
  aesEncrypt(text, key, algorithm = 'aes-256-cbc') {
    const validKeyLengths = {
      'aes-128-cbc': 16,
      'aes-192-cbc': 24,
      'aes-256-cbc': 32
    };
    
    const requiredKeyLength = validKeyLengths[algorithm];
    if (!requiredKeyLength || key.length !== requiredKeyLength) {
      throw new Error(`Key must be ${requiredKeyLength} bytes for ${algorithm}`);
    }
    
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return {
      iv: iv.toString('base64'),
      encryptedData: encrypted
    };
  }

  aesDecrypt(encryptedData, key, iv, algorithm = 'aes-256-cbc') {
    const validKeyLengths = {
      'aes-128-cbc': 16,
      'aes-192-cbc': 24,
      'aes-256-cbc': 32
    };
    
    const requiredKeyLength = validKeyLengths[algorithm];
    if (!requiredKeyLength || key.length !== requiredKeyLength) {
      throw new Error(`Key must be ${requiredKeyLength} bytes for ${algorithm}`);
    }
    
    const decipher = crypto.createDecipheriv(
      algorithm, 
      Buffer.from(key), 
      Buffer.from(iv, 'base64')
    );
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  // Helper method to generate random keys
  generateKey(length) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }
}

module.exports = new EncryptionService();
