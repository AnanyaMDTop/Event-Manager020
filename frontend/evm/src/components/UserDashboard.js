import { useEffect, useState } from "react";
import API from "../services/api";

export default function UserDashboard() {
  const [events, setEvents] = useState([]);
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // Role protection
  useEffect(() => {
    if (role !== "user") {
      alert("Access Denied");
      window.location.href = "/";
    }
  }, [role]);

  // Fetch events
  useEffect(() => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(() => alert("Error fetching events"));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Dashboard</h2>
      <h3>Welcome, {name}</h3>

      <button onClick={logout}>Logout</button>

      <hr />

      <h3>Available Events</h3>

      {events.map(event => (
        <div key={event._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{event.title}</h4>
          <p>{event.description}</p>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>

          <button>Book Ticket</button>
        </div>
      ))}
    </div>
  );
}
