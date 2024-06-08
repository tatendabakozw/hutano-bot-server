const Product = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, sku, expiryDate, price, quantity } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Please enter product name" });
    }
    if (!price) {
      return res.status(400).send({ message: "Please enter product price" });
    }
    if (!sku) {
      return res.status(400).send({ message: "Please enter product sku" });
      xj;
    }

    const item = await Product.findOne({ sku });

    if (item) {
      return res.status(500).send({ message: "Item sku already in use" });
    }

    const newProduct = new Product({
      name,
      price,
      sku,
      description,
      expiryDate,
      quantity,
    });

    await newProduct.save();

    return res.status(200).send({ message: "New product saved!" });
  } catch (error) {
    next(error);
    console.log("error caught: ", error);
  }
};
