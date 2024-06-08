const express = require("express");
const Messages = require("../models/Messages");
const router = express.Router();

router.post("/create", async (req, res, next) => {
  try {
    const { user_id, chat_id, user_message, bot_message } = req.body;

    const userMessage = Messages({
      user_id,
      chat_id,
      sentBy: "me",
      user_message,
      bot_message,
    });

    console.log(userMessage);

    const botMessage = Messages({
      user_id,
      chat_id,
      sentBy: "bot",
      bot_message,
      user_message,
    });

    await userMessage.save();
    const savedBotMessage = await botMessage.save();
    return res
      .status(200)
      .send({ message: "Massage created", message: savedBotMessage });
  } catch (error) {
    next(error);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const { id } = req.query;
    const messages = await Messages.find({ chat_id: id });
    return res.status(200).send({ message: "messages found", messages });
  } catch (error) {
    next(error);
  }
});

router.get("/chats", async (req, res, next) => {
  try {
    const result = await Messages.aggregate([
      {
        $sort: { createdAt: -1 }, // Sort items by createdAt in descending order
      },
      {
        $group: {
          _id: "$chat_id", // Group by the `category` field
          newestEntry: { $first: "$$ROOT" }, // Take the first item in each group (newest due to sorting)
        },
      },
      {
        $replaceRoot: { newRoot: "$newestEntry" }, // Replace root to show only the newest entry
      },
    ]);
    return res.status(200).send({ message: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
