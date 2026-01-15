import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  const role = localStorage.getItem("role");

  // If not logged in
  if (!role) {
    return <Login />;
  }

  // If admin
  if (role === "admin") {
    return <AdminDashboard />;
  }

  // If user
  if (role === "user") {
    return <UserDashboard />;
  }

  return <Login />;
}

export default App;
