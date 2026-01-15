import { useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [hash, setHash] = useState("");

  const verify = async () => {
    const res = await API.post("/tickets/verify", { ticketHash: hash });
    alert(res.data.success ? "VALID" : "INVALID");
  };

  return (
    <>
      <input onChange={e => setHash(e.target.value)} />
      <button onClick={verify}>Check In</button>
    </>
  );
}
