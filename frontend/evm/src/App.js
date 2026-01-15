import Login from "./components/Login";
import CreateEvent from "./components/CreateEvent";
import EventList from "./components/EventList";
import TicketBooking from "./components/TicketBooking";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <>
     <Login />
     <CreateEvent />
      <EventList />
      <TicketBooking />
      <Dashboard />
    </>
  );
}

export default App;
