const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// create an order
// post requirst
router.post("/create", async (req, res, next) => {
  try {
    const newOrder = new Order({
      ...req.body,
    });

    // saving the order
    await newOrder.save();

    res.status(201).send({ message: "Order new item sold" });
  } catch (error) {
    next(error);
  }
});

// get all orders
// get reQUEST
router.get("/all", async (req, res, next) => {
  try {
    // saving the order
    const orders = await Order.find({});

    res.status(201).send({ message: "Orders fuond", orders });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
