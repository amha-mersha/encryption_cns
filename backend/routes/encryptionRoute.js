const express = require("express");
const router = express.Router();
const encryptionController = require("../controllers/encryptionController");

router.post("/encrypt", encryptionController.encryptData);
router.post("/decrypt", encryptionController.decryptData);
router.post("/generate-key", encryptionController.generateKey);
module.exports = router;
