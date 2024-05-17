const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    sku: {
      default: "",
      type: String,
    },
    description: {
      default: "",
      type: String,
    },
    minOrder: {
      default: "",
      type: String,
    },
    quantity: {
      type: String,
      default: "",
    },
    expiryDate: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: 0,
    },
    status: {
      type: String,
      default: "suspended",
      enum: ["suspended", "active"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
