const CryptoJS = require("crypto-js");
 
function DecryptionService(encryptedText) {
  var receivedText = CryptoJS.enc.Hex.parse(encryptedText);
  var key = CryptoJS.enc.Utf8.parse("JaNdRgUkXp2s5v8y");
 
  var decrypted = CryptoJS.AES.decrypt({ ciphertext: receivedText }, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding,
  });
  //Utf8 decode the decrypted data
  decrypted = decrypted.toString(CryptoJS.enc.Utf8);
  return decrypted;
}
 
module.exports = DecryptionService;