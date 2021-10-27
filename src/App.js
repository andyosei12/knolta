import React, { useState, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import DeleteModal from "./components/ui/DeleteModal";
import Loader from "./components/ui/Loader";

const EventForm = React.lazy(() => import("./pages/EventForm"));
const Events = React.lazy(() => import("./pages/Events"));
const EditEvent = React.lazy(() => import("./pages/EditEvent"));

const Appointment = React.lazy(() => import("./pages/Appointment"));
const AppointmentForm = React.lazy(() => import("./pages/AppointmentForm"));
const EditAppointment = React.lazy(() => import("./pages/EditAppointment"));

const Executives = React.lazy(() => import("./pages/Executives"));
const ExecutiveForm = React.lazy(() => import("./pages/ExecutiveForm"));
const EditExecutive = React.lazy(() => import("./pages/EditExecutive"));

const Liturgy = React.lazy(() => import("./pages/Liturgy"));

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
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
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
            <ExecutiveForm />
          </Route>
          <Route path="/executives/:executiveId/edit">
            <EditExecutive />
          </Route>
          <Route path="/liturgy">
            <Liturgy />
          </Route>
        </Switch>
      </Suspense>
      {deleteModal && (
        <DeleteModal eventId={eventId} appointmentId={appointmentId} />
      )}
    </MainLayout>
  );
}

export default App;
