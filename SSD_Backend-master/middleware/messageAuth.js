const cryptojs = require("crypto-js");
require("dotenv").config();

function MessageAuthenticate(originalMessage, encryptedMessage) {
  //encrypt the original message
  var sendingTxt = cryptojs.enc.Utf8.parse(originalMessage);
  var key = cryptojs.enc.Utf8.parse("JaNdRgUkXp2s5v8y");
  var encrypted = cryptojs.AES.encrypt(sendingTxt, key, {
    mode: cryptojs.mode.ECB,
    padding: cryptojs.pad.ZeroPadding,
  });
  encrypted = encrypted.ciphertext.toString(cryptojs.enc.Hex);
  var encryptedTest = encrypted;

  console.log("Org enc ", encryptedMessage);
  console.log("After enc ", encryptedTest);
  if (encryptedTest === encryptedMessage) {
    return true;
  } else {
    return false;
  }
}

module.exports = MessageAuthenticate;
