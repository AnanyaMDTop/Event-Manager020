import { useEffect, useState } from "react";
import API from "../services/api";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events").then(res => setEvents(res.data));
  }, []);

  return events.map(e => <p key={e._id}>{e.title}</p>);
}
