const fs = require("fs");
const forge = require("node-forge");

//const publicKeyPem = fs.readFileSync("./keys/public_key.pem", "utf8");
//const privateKeyPem = fs.readFileSync("./keys/private_key.pem", "utf8");

function encryptWithPublicKey(text, publicKeyPem) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(text, "RSA-OAEP", {
    md: forge.md.sha256.create(),
  });
  return forge.util.encode64(encrypted);
}

function decryptWithPrivateKey(encryptedBase64, privateKeyPem) {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const encryptedBytes = forge.util.decode64(encryptedBase64);
  const decrypted = privateKey.decrypt(encryptedBytes, "RSA-OAEP", {
    md: forge.md.sha256.create(),
  });
  return decrypted;
}

module.exports = {
  encryptWithPublicKey,
  decryptWithPrivateKey,
};
