const mongoose = require ('mongoose');
const User = require('./user.model');
const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true},
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", messageSchema);
