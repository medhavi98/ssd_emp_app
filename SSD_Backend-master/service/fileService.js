const FileModel = require("../models/fileModel");
var FileAuthenticate = require("../middleware/fileAuth");
var FileValidation = require("../middleware/jwtValidation/fileValidation");
var EncryptionService = require("../service/encryptionService");

const createFile = async (file, encryptedFiles, sender, request) => {
    return new Promise(async (resolve, reject) => {
        var encryptedFile = EncryptionService(file);
        var encryptedSender = EncryptionService(sender);

        const fileDetails = new FileModel({
            uploadFile: encryptedFile,
            sender: encryptedSender,
        });

        if (FileValidation(request)) {
            //Message authentication
            if (FileAuthenticate(file, encryptedFiles)) {
                try {
                    const message = await fileDetails.save();
                    resolve({
                        status: 201,
                        obj: message,
                    });
                } catch (err) {
                    reject({
                        status: 400,
                        obj: {
                            code: 400,
                            error: err.message,
                        },
                    });
                }
            } else {
                reject({
                    status: 401,
                    obj: {
                        code: 401,
                        error: "File authentication failed",
                    },
                });
            }
        } else {
            reject({
                status: 401,
                obj: {
                    code: 401,
                    error: "Permission not granted",
                },
            });
        }
    })
};

module.exports = createFile;
