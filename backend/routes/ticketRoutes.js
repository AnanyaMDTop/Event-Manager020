const express = require("express");
const crypto = require("crypto");
const Web3 = require("web3");
const Ticket = require("../models/Tickets");
const generateQR = require("../utils/qr");

const router = express.Router();
const web3 = new Web3("http://127.0.0.1:7545");

const ABI = [ /* PASTE ABI */ ];
const ADDRESS = "CONTRACT_ADDRESS";
const ACCOUNT = "GANACHE_ACCOUNT";

const contract = new web3.eth.Contract(ABI, ADDRESS);

router.post("/book", async (req, res) => {
  const hash = crypto.randomBytes(16).toString("hex");

  await contract.methods.addTicket(hash)
    .send({ from: ACCOUNT, gas: 300000 });

  const qr = await generateQR(hash);

  const ticket = await Ticket.create({
    ...req.body,
    ticketHash: hash,
    qrCode: qr
  });

  res.json(ticket);
});

router.post("/verify", async (req, res) => {
  const valid = await contract.methods
    .verifyTicket(req.body.ticketHash).call();

  if (!valid) return res.json({ success: false });

  await Ticket.updateOne(
    { ticketHash: req.body.ticketHash },
    { checkedIn: true }
  );

  res.json({ success: true });
});

module.exports = router;
