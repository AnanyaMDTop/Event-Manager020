import API from "../services/api";

export default function CreateEvent() {
  const create = async () => {
    await API.post("/events", {
      title: "Tech Fest",
      date: "2026-02-10",
      location: "College Hall"
    });
    alert("Event Created");
  };

  return <button onClick={create}>Create Event</button>;
}
