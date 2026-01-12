const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  await User.create(req.body);
  res.send("User Registered");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  res.json(user);
});

module.exports = router;
