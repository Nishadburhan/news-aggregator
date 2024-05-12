const express = require("express");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRoute.post("/signup", (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    user
      .save()
      .then(() => {
        res.status(201).json({ message: "User registered successfully" });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    console.error("Error occured while signup the user", error);
    res.status(500).send(error);
  }
});

userRoute.post("/login", (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let validatedPassword = bcrypt.compareSync(password, user.password);
      if (!validatedPassword) {
        return res.status(401).json({ message: "Password is incorrect" });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 86000,
        }
      );

      return res.status(200).send({
        token: token,
        user: {
          id: user.id,
        },
        message: "User logged in successfully",
      });
    }).catch((err) => {
        return res.status(400).send(err);
    });
  } catch (error) {
    console.error("Error occured while login the user", error);
    res.status(500).send(error);
  }
});

module.exports = userRoute;
