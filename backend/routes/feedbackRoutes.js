const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();

router.post("/", async (req, res) => {
  await Feedback.create(req.body);
  res.send("Feedback submitted");
});

router.get("/:eventId", async (req, res) => {
  res.json(await Feedback.find({ eventId: req.params.eventId }));
});

module.exports = router;
