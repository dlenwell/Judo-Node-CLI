const crypto = require('crypto');

function encrypt(key, text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

function decrypt(key, data) {
  const bufferData = Buffer.from(data, 'base64');
  const iv = bufferData.slice(0, 16);
  const tag = bufferData.slice(16, 32);
  const text = bufferData.slice(32);

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = decipher.update(text, 'binary', 'base64') + decipher.final('base64');

  return decrypted;
};

module.exports = {
  encrypt,
  decrypt
};
