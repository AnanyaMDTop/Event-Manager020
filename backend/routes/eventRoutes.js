const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

router.post("/", async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
});

router.get("/", async (req, res) => {
  res.json(await Event.find());
});

module.exports = router;
