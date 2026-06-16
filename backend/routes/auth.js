const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already exists'
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log()
    const user = await User.create({
      username, email, password: hashedPassword
    })
    res.status(201).json({
      message: 'User created',
      userId: user._id
    });
  }
  catch (error) {
    console.log("+++++++ ", error);
    res.status(500).json({error: error});
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("+++++++ email: ", {email, password});

    const user = await User.findOne({
      email
    });

    console.log("++++ ", user)

    if (!user?.password) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;