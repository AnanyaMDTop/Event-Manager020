import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      await API.post("/register", {
        ...form,
        role: "user"   // role assigned here or in backend
      });
      alert("Registration Successful");
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <>
      <input placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input placeholder="Password" type="password"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <button onClick={register}>Register</button>
    </>
  );
}
