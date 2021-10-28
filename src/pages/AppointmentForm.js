// info: import of hooks
import { Fragment, useRef } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";

// info: import of components
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";

// info: import of various styles
import styles from "../styles/Form/Form.module.css";
import btnstyles from "../styles/Button/PrimaryButton.module.css";
import loaderStyles from "../styles/Loader/Loader.module.css";

const AppointmentForm = () => {
  const dateInputRef = useRef();
  const mcInputRef = useRef();
  const firstAcolyteRef = useRef();
  const secondAcolyteRef = useRef();
  const crossRef = useRef();
  const thurifierRef = useRef();
  const boatRef = useRef();
  const fmRef = useRef();
  const [sendRequest] = useHttp();
  const history = useHistory();
  const httpError = useSelector((state) => state.ui.httpError);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);

  // info: submitting form handler
  const submitFormHandler = (event) => {
    event.preventDefault();

    const data = {
      date: dateInputRef.current.value,
      mc: mcInputRef.current.value,
      firstAcolyte: firstAcolyteRef.current.value,
      secondAcolyte: secondAcolyteRef.current.value,
      crossBearer: crossRef.current.value,
      thurifier: thurifierRef.current.value,
      boat: boatRef.current.value,
      fm: fmRef.current.value,
    };

    sendRequest({
      url: `https://shccknolta-default-rtdb.firebaseio.com/appointments.json`,
      method: "POST",
      body: data,
    }).then(() => history.push("/appointments"));
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
          <h3>Add an appointment</h3>
          <Input
            label="Date"
            ref={dateInputRef}
            input={{
              type: "date",
              name: "date",
              placeholder: "Date",
            }}
          />
          <Input
            label="MC"
            ref={mcInputRef}
            input={{
              type: "text",
              name: "mc",
              placeholder: "MC",
            }}
          />
          <Input
            label="First Acolyte"
            ref={firstAcolyteRef}
            input={{
              type: "text",
              name: "first acolyte",
              placeholder: "First acolyte",
            }}
          />
          <Input
            label="Second Acolyte"
            ref={secondAcolyteRef}
            input={{
              type: "text",
              name: "second acolyte",
              placeholder: "Second acolyte",
            }}
          />
          <Input
            label="Cross Bearer"
            ref={crossRef}
            input={{
              type: "text",
              name: "cross bearer",
              placeholder: "Cross bearer",
            }}
          />
          <Input
            label="Thurifier"
            ref={thurifierRef}
            input={{
              type: "text",
              name: "thurifier",
              placeholder: "Thurifier",
            }}
          />
          <Input
            label="Boat Bearer"
            ref={boatRef}
            input={{
              type: "text",
              name: "boat",
              placeholder: "Boat bearer",
            }}
          />
          <Input
            label="FM"
            ref={fmRef}
            input={{
              type: "text",
              name: "fm",
              placeholder: "Fire Monitor",
            }}
          />
          <button type="submit" className={btnstyles.btn}>
            Submit
          </button>
        </form>
      )}
    </Fragment>
  );
};

export default AppointmentForm;
