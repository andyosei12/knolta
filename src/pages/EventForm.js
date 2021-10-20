import { useDispatch, useSelector } from "react-redux";
import { Fragment, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { uiActions } from "../store/ui/ui-slice";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import styles from "../styles/Events/EventForm.module.css";
import primarybtnstyles from "../styles/Button/PrimaryButton.module.css";
import loaderStyles from "../styles/Loader/Loader.module.css";
import { sendEvent } from "../store/event-action";
import { uiActions } from "../store/ui/ui-slice";

const EventForm = () => {
  const dateInputRef = useRef();
  const eventInputRef = useRef();
  const venueInputRef = useRef();
  const [formIsInValid, setFormIsInValid] = useState(false);
  const dispatch = useDispatch();
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const httpError = useSelector((state) => state.ui.httpError);
  const successRequest = useSelector((state) => state.ui.successRequest);
  const history = useHistory();

  useEffect(() => {
    if (successRequest) {
      history.push("/events");
    }
    return () => {
      dispatch(uiActions.removeSuccessfulRequest());
    };
  }, [successRequest, history, dispatch]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const date = dateInputRef.current.value;
    const eventName = eventInputRef.current.value;
    const venue = venueInputRef.current.value;

    if (date.trim() === "" || eventName.trim() === "" || venue.trim() === "") {
      setFormIsInValid(true);
      return;
    } else {
      setFormIsInValid(false);
    }
    dispatch(
      sendEvent({
        date: date,
        name: eventName,
        venue: venue,
      })
    );
  };

  return (
    <Fragment>
      {loadingSpinner && (
        <div className={loaderStyles.loading}>
          <Loader />
        </div>
      )}
      {httpError && <p className="error__text">{httpError}</p>}
      <form className={styles.form} onSubmit={submitFormHandler}>
        <h3>Add an event</h3>
        {formIsInValid && <p>All fields are required</p>}
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
        <button type="submit" className={primarybtnstyles.btn}>
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default EventForm;
