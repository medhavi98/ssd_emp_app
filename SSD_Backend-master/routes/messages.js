const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");
var MessageAuthenticate = require("../middleware/messageAuth");
var MsgValidation = require("../middleware/jwtValidation/msgValidation");
var EncryptionService = require("../service/encryptionService");
var DecryptionService = require("../service/decryptionService");

router.post("/messages", async (req, res) => {
  //encrypt original payload
  var encMsg = EncryptionService(req.body.message);
  var encSender = EncryptionService(req.body.sender);

  //creating the JS object
  const messages = new Message({
    message: encMsg,
    encryptedMsg: req.body.encryptedMsg,
    sender: encSender,
  });

  //jwt validation
  if (MsgValidation(req)) {
    //Message authentication
    if (MessageAuthenticate(req.body.message, req.body.encryptedMsg)) {
      try {
        const saveMessage = await messages.save();
        res.status(201).json(saveMessage);
      } catch (err) {
        res.status(400).json({
          code: 400,
          error: err.message,
        });
      }
    } else {
      res.status(401).json({
        code: 401,
        error: "Message authentication failed",
      });
    }
  } else {
    res.status(401).json({
      code: 401,
      error: "Permission not granted",
    });
  }
});

router.get("/messagess/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    console.log("userName", userName);

    const groups = await Message.find();

    const result = groups.filter((m) => {
      if (userName === DecryptionService(m.sender)) {
        return m;
      }
    });

    let finalResult = [];
    result.forEach((m) => {
      var decSender = DecryptionService(m.message);
      finalResult = [...finalResult, decSender];
    });

    console.log("decSender", finalResult);
    res.json(finalResult);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
