const cryptoJs = require("crypto-js");
require("dotenv").config();


function FileAuthenticate(file, encryptedFile) {

    //encrypt the original message
    var sendingFile = cryptoJs.enc.Utf8.parse(file);
    var key = cryptoJs.enc.Utf8.parse("JaNdRgUkXp2s5v8y");
    var encryptedFileN = cryptoJs.AES.encrypt(sendingFile, key, {
        mode: cryptoJs.mode.ECB,
        padding: cryptoJs.pad.ZeroPadding,
    });

    encryptedFileN = encryptedFileN.ciphertext.toString(cryptoJs.enc.Hex);
    var encryptedTestFile = encryptedFileN;

    console.log("Org enc File", encryptedFile);
    console.log("After enc File", encryptedTestFile);

    if (encryptedTestFile === encryptedFile) {
        return true;
    } else {
        return false;
    }

}


module.exports = FileAuthenticate;