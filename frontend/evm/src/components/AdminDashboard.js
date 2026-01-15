import { useEffect, useState } from "react";
import API from "../services/api";
import CreateEvent from "./CreateEvent";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('dashboard');
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // Role protection
  useEffect(() => {
    if (role !== "admin") {
      alert("Access Denied");
      window.location.href = "/";
    }
  }, [role]);

  // Fetch events
  useEffect(() => {
    if (view === 'dashboard') {
      API.get("/events")
        .then(res => setEvents(res.data))
        .catch(() => alert("Error fetching events"));
    }
  }, [view]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (view === 'create-event') {
    return <CreateEvent setView={setView} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <h3>Welcome, {name}</h3>

      <button onClick={() => setView('create-event')}>
        Create Event
      </button>

      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Logout
      </button>

      <hr />

      <h3>All Events</h3>

      {events.map(event => (
        <div key={event._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{event.title}</h4>
          <p>{event.description}</p>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Organizer: {event.organizer}</p>
        </div>
      ))}
    </div>
  );
}
