const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  uploadFile: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("file", fileSchema);
