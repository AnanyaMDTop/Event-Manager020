const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.send("User Registered");
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email,password});

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    );

    // Send only required data
    res.json({
      token: token,
      name: user.name,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
