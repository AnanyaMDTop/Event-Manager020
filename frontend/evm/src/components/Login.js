import API from "../services/api";

export default function Login() {
  const login = async () => {
    await API.post("/auth/login", {
      email: "admin@test.com",
      password: "123"
    });
    alert("Logged in");
  };

  return <button onClick={login}>Login</button>;
}
