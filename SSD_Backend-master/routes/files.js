const express = require('express');
const router = express.Router();
const createFile = require("../service/fileService");

router.post("/uploadFiles", async (req, res) => {
  //encrypt original payload
  const { uploadFile, encryptedfile,sender } = req.body;

  try {
    const result =await createFile(uploadFile,encryptedfile,sender,req);
    console.log("Result",result);
    if (result.status === 201) {
      res.json(result.obj);
    } else if (result.status === 401) {
      res.status(401).json({ message: "invalid" });
    } else {
      res.status(400).json({ message: "invalid" });
    }
  } catch (err) {
    res.status(400).json({ message: "invalid" });
  }
});

module.exports = router;