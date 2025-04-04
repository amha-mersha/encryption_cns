const express = require("express");
const router = express.Router();
const encryptionController = require("../controllers/encryptionController");
const rsaController = require("../controllers/rsaController");

// OTP routes
router.post("/otp/encrypt", encryptionController.encryptOTP);
router.post("/otp/decrypt", encryptionController.decryptOTP);

// 3DES routes
router.post("/3des/encrypt", encryptionController.encrypt3DES);
router.post("/3des/decrypt", encryptionController.decrypt3DES);

// AES routes
router.post("/aes/encrypt", encryptionController.encryptAES);
router.post("/aes/decrypt", encryptionController.decryptAES);

// Key generation
router.get("/key/generate", encryptionController.generateKey);

// RSA encryption
router.post("/rsa/encrypt", rsaController.encryptRSA);
router.post("/rsa/decrypt", rsaController.decryptRSA);

module.exports = router;
