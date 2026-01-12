const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: String,
  eventId: String,
  ticketHash: String,
  qrCode: String,
  checkedIn: { type: Boolean, default: false }
});

module.exports = mongoose.model("Ticket", ticketSchema);
