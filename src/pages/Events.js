import React from "react";
import { Link } from "react-router-dom";

import btnstyles from "../styles/Button/PrimaryButton.module.css";
import eventstyles from "../styles/Events/Events.module.css";

const Events = () => {
  return (
    <section className={eventstyles.events}>
      <Link to="/events/create" className={btnstyles.btn}>
        Add Event
      </Link>
    </section>
  );
};

export default Events;
