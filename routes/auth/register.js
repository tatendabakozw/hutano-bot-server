const express = require("express");
const User = require("../../models/User");
const router = express.Router();

// create account
// post request
router.post("/register", async (req, res, next) => {
  try {
    const { password, confirm_password, email } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(404)
        .send({ message: "User with id already registered" });
    }

    if (!email) {
      return res.status(400).send({ message: "Please provide an email" });
    }

    if (password !== confirm_password) {
      return res.status(401).send({ message: "Passwords do not match" });
    }
    if (password <= 6) {
      return res
        .status(401)
        .send({ message: "Passwords must be greater than 6 characters" });
    }

    const newUser = new User({
      password,
      email,
    });

    await newUser.save();

    return res.status(200).send({ message: "Applicaction sent!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
