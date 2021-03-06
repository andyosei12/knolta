import React, { useState, Suspense, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./layout/MainLayout";
import AuthContext from "./auth/auth-context";

import Home from "./pages/Home";
import DeleteModal from "./components/ui/DeleteModal";
import Loader from "./components/ui/Loader";
import RequireAuth from "./auth/RequireAuth";

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
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  const [eventId, setEventId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const deleteModal = useSelector((state) => state.ui.deleteModal);
  const authCtx = useContext(AuthContext);
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
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/events"
            element={<Events onConfirmDelete={confirmDeleteHandler} />}
          />
          <Route
            path="/events/create"
            element={
              <RequireAuth>
                <EventForm />
              </RequireAuth>
            }
          />
          <Route path="/events/:eventId/edit" element={<EditEvent />} />
          <Route
            path="/appointments"
            element={
              <Appointment onConfirmDelete={confirmAppointmentDeleteHandler} />
            }
          />
          <Route
            path="/appointments/create"
            element={
              <RequireAuth>
                <AppointmentForm />
              </RequireAuth>
            }
          />
          <Route
            path="/appointments/:appointmentId/edit"
            element={<EditAppointment />}
          />
          <Route path="/executives" element={<Executives />} />
          <Route
            path="/executives/create"
            element={
              <RequireAuth>
                <ExecutiveForm />
              </RequireAuth>
            }
          />
          <Route
            path="/executives/:executiveId/edit"
            element={<EditExecutive />}
          />

          <Route path="/liturgy" element={<Liturgy />} />
          {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      {deleteModal && (
        <DeleteModal eventId={eventId} appointmentId={appointmentId} />
      )}
    </MainLayout>
  );
}

export default App;
