const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user_message: {
      type: String,
      default: "",
    },
    bot_message: {
      type: String,
      default: "",
    },
    chat_id: {
      type: String,
      default: "",
    },
    user_id: {
      type: String,
    },
    sentBy: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
