import { useState } from "react";
import API from "../services/api";

export default function TicketBooking() {
  const [ticket, setTicket] = useState(null);

  const book = async () => {
    const res = await API.post("/tickets/book", {
      userId: "1",
      eventId: "1"
    });
    setTicket(res.data);
  };

  return (
    <>
      <button onClick={book}>Book Ticket</button>
      {ticket && <img src={ticket.qrCode} alt="QR CODE"/>}
    </>
  );
}
