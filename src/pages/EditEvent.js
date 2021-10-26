import { Fragment, useEffect, useState, useRef, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import btnStyles from "../styles/Button/PrimaryButton.module.css";
import formStyles from "../styles/Events/EventForm.module.css";
import loaderStyles from "../styles/Loader/Loader.module.css";

const EditEvent = () => {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const nameRef = useRef();
  const dateRef = useRef();
  const venueRef = useRef();
  const httpError = useSelector((state) => state.ui.httpError);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const history = useHistory();
  const { eventId } = params;

  const [fetchEvent] = useHttp();
  const [sendRequest] = useHttp();

  const applyData = useCallback((data) => {
    setEvent(data);
  }, []);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      date: dateRef.current.value,
      venue: venueRef.current.value,
    };
    sendRequest({
      url: `https://knolta-beb08-default-rtdb.firebaseio.com/events/${eventId}.json`,
      method: "PATCH",
      body: data,
    }).then(() => history.push("/events"));
  };

  useEffect(() => {
    fetchEvent(
      {
        url: `https://knolta-beb08-default-rtdb.firebaseio.com/events/${eventId}.json`,
      },
      applyData
    );
  }, [fetchEvent, eventId, applyData]);
  return (
    <Fragment>
      {loadingSpinner && (
        <div className={loaderStyles.loading}>
          <Loader />
        </div>
      )}
      {httpError && <p className="error__text">{httpError}</p>}
      {!httpError && event && (
        <form onSubmit={submitFormHandler} className={formStyles.form}>
          <h3>Edit an event</h3>
          <Input
            label="Date"
            ref={dateRef}
            input={{ type: "date", name: "date", defaultValue: event.date }}
          />
          <Input
            label="Name"
            ref={nameRef}
            input={{ type: "text", name: "event", defaultValue: event.name }}
          />
          <Input
            label="Date"
            ref={venueRef}
            input={{ type: "text", name: "venue", defaultValue: event.venue }}
          />
          <button className={btnStyles.btn}>Update</button>
        </form>
      )}
    </Fragment>
  );
};

export default EditEvent;
