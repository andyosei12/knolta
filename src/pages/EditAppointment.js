import { useCallback, useEffect, useState, useRef, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";

import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import btnStyles from "../styles/Button/PrimaryButton.module.css";
import formStyles from "../styles/Form/Form.module.css";
import loaderStyles from "../styles/Loader/Loader.module.css";

const EditAppointment = () => {
  const [fetchAppointment] = useHttp();
  const [sendRequest] = useHttp();
  const [appointment, setAppointment] = useState(null);
  const params = useParams();
  const dateInputRef = useRef();
  const mcInputRef = useRef();
  const firstAcolyteRef = useRef();
  const secondAcolyteRef = useRef();
  const crossRef = useRef();
  const thurifierRef = useRef();
  const boatRef = useRef();
  const fmRef = useRef();
  const httpError = useSelector((state) => state.ui.httpError);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const history = useHistory();

  const { appointmentId } = params;
  const applyData = useCallback((data) => {
    setAppointment(data);
  }, []);

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
      url: `https://shccknolta-default-rtdb.firebaseio.com/appointments/${appointmentId}.json`,
      method: "PATCH",
      body: data,
    }).then(() => history.push("/appointments"));
  };

  useEffect(() => {
    fetchAppointment(
      {
        url: `https://shccknolta-default-rtdb.firebaseio.com/appointments/${appointmentId}.json`,
      },
      applyData
    );
  }, [fetchAppointment, appointmentId, applyData]);
  return (
    <Fragment>
      {loadingSpinner && (
        <div className={loaderStyles.loading}>
          <Loader />
        </div>
      )}
      {httpError && <p className="error__text">{httpError}</p>}
      {!httpError && appointment && (
        <form onSubmit={submitFormHandler} className={formStyles.form}>
          <h3>Edit Appointment</h3>
          <Input
            label="Date"
            ref={dateInputRef}
            input={{
              type: "date",
              name: "position",
              defaultValue: appointment.date,
            }}
          />
          <Input
            label="MC"
            ref={mcInputRef}
            input={{
              type: "text",
              name: "mc",
              defaultValue: appointment.mc,
            }}
          />
          <Input
            label="First Acolyte"
            ref={firstAcolyteRef}
            input={{
              type: "text",
              name: "first acolyte",
              defaultValue: appointment.firstAcolyte,
            }}
          />
          <Input
            label="Second Acolyte"
            ref={secondAcolyteRef}
            input={{
              type: "text",
              name: "second acolyte",
              defaultValue: appointment.secondAcolyte,
            }}
          />
          <Input
            label="Cross Bearer"
            ref={crossRef}
            input={{
              type: "text",
              name: "cross bearer",
              defaultValue: appointment.crossBearer,
            }}
          />
          <Input
            label="Thurifier"
            ref={thurifierRef}
            input={{
              type: "text",
              name: "thurifier",
              defaultValue: appointment.thurifier,
            }}
          />
          <Input
            label="Boat Bearer"
            ref={boatRef}
            input={{
              type: "text",
              name: "boat",
              defaultValue: appointment.boat,
            }}
          />
          <Input
            label="FM"
            ref={fmRef}
            input={{
              type: "text",
              name: "fm",
              defaultValue: appointment.fm,
            }}
          />
          <button className={btnStyles.btn}>Update</button>
        </form>
      )}
    </Fragment>
  );
};

export default EditAppointment;
