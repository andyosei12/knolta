import { Fragment, useEffect, useCallback, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import { uiActions } from "../store/ui/ui-slice";
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
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = params;

  const fetchEvent = useCallback(async () => {
    dispatch(uiActions.showLoadingSpinner());
    const response = await fetch(
      `https://knolta-beb08-default-rtdb.firebaseio.com/events/${eventId}.json`
    );

    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    setEvent(data);
    dispatch(uiActions.closeLoadingSpinner());
  }, [eventId, dispatch]);

  const editRequest = async (data) => {
    dispatch(uiActions.showLoadingSpinner());
    const response = await fetch(
      `https://knolta-beb08-default-rtdb.firebaseio.com/events/${eventId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error();
    }
    dispatch(uiActions.closeLoadingSpinner());
    history.push("/events");
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      date: dateRef.current.value,
      venue: venueRef.current.value,
    };
    editRequest(data).catch((err) => {
      dispatch(uiActions.setHttpError("Something went wrong"));
      dispatch(uiActions.closeLoadingSpinner());
    });
  };

  useEffect(() => {
    fetchEvent().catch((err) => {
      dispatch(uiActions.setHttpError("Something went wrong"));
      dispatch(uiActions.closeLoadingSpinner());
    });
  }, [fetchEvent, dispatch]);
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
          <button className={btnStyles.btn}>Edit</button>
        </form>
      )}
    </Fragment>
  );
};

export default EditEvent;
