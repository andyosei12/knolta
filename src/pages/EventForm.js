import { useSelector } from "react-redux";
import { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import styles from "./Form.module.scss";
import loaderStyles from "../components/ui/Loader.module.scss";
import useHttp from "../hooks/use-http";

const EventForm = () => {
  const dateInputRef = useRef();
  const eventInputRef = useRef();
  const venueInputRef = useRef();
  const [formIsInValid, setFormIsInValid] = useState(false);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const httpError = useSelector((state) => state.ui.httpError);
  const navigate = useNavigate();
  const [sendEvent] = useHttp();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const date = dateInputRef.current.value;
    const eventName = eventInputRef.current.value;
    const venue = venueInputRef.current.value;

    const data = {
      date,
      name: eventName,
      venue,
    };

    if (date.trim() === "" || eventName.trim() === "" || venue.trim() === "") {
      setFormIsInValid(true);
      return;
    } else {
      setFormIsInValid(false);
    }

    sendEvent({
      url: "https://shccknolta-default-rtdb.firebaseio.com/events.json",
      method: "POST",
      body: data,
    }).then(() => navigate("/events"));
  };

  return (
    <Fragment>
      {loadingSpinner && (
        <div className={loaderStyles.loading}>
          <Loader />
        </div>
      )}
      {httpError && <p className="error__text">{httpError}</p>}
      {!httpError && (
        <form className={styles.form} onSubmit={submitFormHandler}>
          <h3>Add an event</h3>
          {formIsInValid && (
            <p className="error__message">All fields are required</p>
          )}
          <Input
            label="date"
            ref={dateInputRef}
            input={{ type: "date", name: "date", placeholder: "Select date" }}
          />
          <Input
            label="event"
            ref={eventInputRef}
            input={{
              type: "text",
              name: "event",
              placeholder: "Enter event name",
            }}
          />
          <Input
            label="venue"
            ref={venueInputRef}
            input={{
              type: "text",
              name: "venue",
              placeholder: "Enter event venue",
            }}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      )}
    </Fragment>
  );
};

export default EventForm;
