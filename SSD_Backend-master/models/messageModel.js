const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
