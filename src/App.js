import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./layout/MainLayout";
import EventForm from "./pages/EventForm";
import Appointment from "./pages/Appointment";
import Events from "./pages/Events";
import Executives from "./pages/Executives";
import Home from "./pages/Home";
import Liturgy from "./pages/Liturgy";
import EditEvent from "./pages/EditEvent";
import DeleteModal from "./components/ui/DeleteModal";
import Executiveform from "./pages/ExecutiveForm";
import EditExecutive from "./pages/EditExecutive";
import AppointmentForm from "./pages/AppointmentForm";
import EditAppointment from "./pages/EditAppointment";

function App() {
  const [eventId, setEventId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const deleteModal = useSelector((state) => state.ui.deleteModal);
  const confirmDeleteHandler = (id) => {
    setEventId(id);
  };
  const confirmAppointmentDeleteHandler = (id) => {
    setAppointmentId(id);
  };
  return (
    <MainLayout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/events" exact>
          <Events onConfirmDelete={confirmDeleteHandler} />
        </Route>
        <Route path="/events/create">
          <EventForm />
        </Route>
        <Route path="/events/:eventId/edit">
          <EditEvent />
        </Route>
        <Route path="/appointments" exact>
          <Appointment onConfirmDelete={confirmAppointmentDeleteHandler} />
        </Route>
        <Route path="/appointments/create">
          <AppointmentForm />
        </Route>
        <Route path="/appointments/:appointmentId/edit">
          <EditAppointment />
        </Route>
        <Route path="/executives" exact>
          <Executives />
        </Route>
        <Route path="/executives/create">
          <Executiveform />
        </Route>
        <Route path="/executives/:executiveId/edit">
          <EditExecutive />
        </Route>
        <Route path="/liturgy">
          <Liturgy />
        </Route>
      </Switch>
      {deleteModal && (
        <DeleteModal eventId={eventId} appointmentId={appointmentId} />
      )}
    </MainLayout>
  );
}

export default App;
