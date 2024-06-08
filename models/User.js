const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    chats: {
      type: Array,
    },

    password: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
