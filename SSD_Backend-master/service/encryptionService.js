const cryptojs = require("crypto-js");

function EncryptionService(originalMessage) {
  var sendingTxt = cryptojs.enc.Utf8.parse(originalMessage);
  var key = cryptojs.enc.Utf8.parse("JaNdRgUkXp2s5v8y");
  var encrypted = cryptojs.AES.encrypt(sendingTxt, key, {
    mode: cryptojs.mode.ECB,
    padding: cryptojs.pad.ZeroPadding,
  });
  encrypted = encrypted.ciphertext.toString(cryptojs.enc.Hex);
  return encrypted;
}

module.exports = EncryptionService;
