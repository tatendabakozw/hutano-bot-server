const express = require("express");
const Messages = require("../models/Messages");
const router = express.Router();

router.post("/create", async (req, res, next) => {
  try {
    const { user_id, chat_id, user_message, bot_message } = req.body;

    const newMessage = Messages({
      user_id,
      chat_id,
      user_message,
      bot_message,
    });

    await newMessage.save();
    return res.status(200).send({ message: "Massage created" });
  } catch (error) {
    next(error);
  }
});
