import { Redirect, Route, Switch } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Appointment from "./pages/Appointment";
import Events from "./pages/Events";
import Executives from "./pages/Executives";
import Home from "./pages/Home";
import Liturgy from "./pages/Liturgy";

function App() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/events">
          <Events />
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
    </MainLayout>
  );
}

export default App;
