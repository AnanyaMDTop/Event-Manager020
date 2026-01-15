const express = require("express");
const crypto = require("crypto");
const Web3 = require("web3");
const Ticket = require("../models/Tickets");
const generateQR = require("../utils/qr");

const router = express.Router();
const web3 = new Web3("http://127.0.0.1:7545");

const contractJson = require("../scripts/build/EventTicket.json");
const ABI = contractJson.abi;

const CONTRACT_ADDRESS = "0x578946b778666C0Ac742D8F9f8124A40965F94Cc";
const ACCOUNT = "0xd245016dfEc083B304976075B019F6a40bE227cb";

const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

/**
 * BOOK TICKET (Blockchain + DB)
 */
router.post("/book", async (req, res) => {
  try {
    const { eventName, userAddress } = req.body;

    const ticketHash = crypto.randomBytes(16).toString("hex");

    await contract.methods
      .createTicket(ticketHash, eventName, userAddress)
      .send({ from: ACCOUNT, gas: 300000 });

    const qr = await generateQR(ticketHash);

    const ticket = await Ticket.create({
      eventName,
      userAddress,
      ticketHash,
      qrCode: qr,
      checkedIn: false
    });

    res.json(ticket);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * VERIFY TICKET (BLOCKCHAIN FIRST)
 */
router.post("/verify", async (req, res) => {
  try {
    const { ticketHash } = req.body;

    const verified = await contract.methods
      .verifyTicket(ticketHash)
      .send({ from: ACCOUNT, gas: 200000 });

    await Ticket.updateOne(
      { ticketHash },
      { checkedIn: true }
    );

    res.json({ success: true });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
