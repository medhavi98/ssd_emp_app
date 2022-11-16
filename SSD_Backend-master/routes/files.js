const express = require('express');
const router = express.Router();
const File = require('../models/fileModel');
const fs = require("fs-extra");
var MessageAuthenticate = require("../middleware/messageAuth");
var FileValidation = require("../middleware/jwtValidation/fileValidation");
var EncryptionService = require("../service/encryptionService");
const DecryptionService = require('../service/decryptionService');

router.post("/uploadFiles", async (req, res) => {

    //encrypt original payload
    const deCryptSender = DecryptionService(encSender);
    const file = req.files ? req.files.uploadFile : '';
    const path = `uploads/${deCryptSender}`;
    const correctPath = `${path}/` + file.name;
    var encSender = EncryptionService(req.body.sender);
    var encFilePath = EncryptionService(correctPath);

    if (fs.existsSync(correctPath)) {
        res.status(409).json('File is already exist!');
    } else {

        if (!fs.existsSync(path)) {
            //path not exist create new path
            fs.mkdirSync(path);
            console.log('path created');
        }

        //creating the JS object
        const newFile = new File({
            uploadFile: encFilePath,
            encryptedFile: req.body.encryptedFile,
            sender: encSender
        });

        //jwt validation
        if (FileValidation(req)) {
            //File authentication
            if (MessageAuthenticate(req.body.uploadFile, req.body.encryptedFile)) {
                try {

                    file.mv(`${path}/` + file.name, function (err, result) {
                        if (err) { throw err; }
                        console.log('Correct Path ', correctPath);
                        newFile.save();
                        res.status(201).json('File upload successfully');
                    });

                } catch (error) {
                    res.status(400).json({ code: 400, error: error.message });
                }
            } else {
                res.status(401).json({ code: 401, error: "Message authentication failed" });
            }
        } else {
            res.status(401).json({ code: 401, error: "Permission not granted" });
        }
    }
});


module.exports = router;