import { useState } from "react";
import API from "../services/api";

export default function CreateEvent({ setView }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", form);
      alert("Event Created Successfully");
      setView('dashboard');
    } catch (err) {
      alert("Error creating event");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <button onClick={() => setView('dashboard')}>Back to Dashboard</button>
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="organizer"
          placeholder="Organizer Name"
          value={form.organizer}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
