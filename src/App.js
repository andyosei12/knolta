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

function App() {
  const [eventId, setEventId] = useState("");
  const deleteModal = useSelector((state) => state.ui.deleteModal);
  const confirmDeleteHandler = (id) => {
    setEventId(id);
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
        <Route path="/appointment">
          <Appointment />
        </Route>
        <Route path="/executives">
          <Executives />
        </Route>
        <Route path="/liturgy">
          <Liturgy />
        </Route>
      </Switch>
      {deleteModal && <DeleteModal eventId={eventId} />}
    </MainLayout>
  );
}

export default App;
