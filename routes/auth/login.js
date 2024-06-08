const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

//login user
// post requestt
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    // create user of not exist
    if (!user) {
      const newUser = new User({
        password,
        email,
      });

      const newUserItem = await newUser.save();

      const token = await jwt.sign(
        {
          email: newUserItem.email,
          _id: newUserItem._id,
        },
        process.env.JWT_SECRET
      );
      if (token) {
        const lo_user = {
          email: newUserItem.email,
          _id: newUserItem._id,
          token: token,
        };

        return res.send({ ...lo_user, message: "logged in sucessfully" });
      }
    }

    if (password !== user.password) {
      return res.status(403).send({ message: "Wrong ID or password" });
    }

    const token = await jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET
    );
    if (token) {
      const lo_user = {
        email: user.email,
        _id: user._id,
        token: token,
      };

      return res.send({ ...lo_user, message: "logged in sucessfully" });
    }
    return res.status(500).send({ message: "Problem loggin in" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
