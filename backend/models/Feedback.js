const mongoose = require("mongoose");

module.exports = mongoose.model("Feedback", new mongoose.Schema({
  eventId: String,
  rating: Number,
  comment: String
}));
