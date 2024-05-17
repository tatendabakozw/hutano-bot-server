const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: {
      type: Array,
    },
    method: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
