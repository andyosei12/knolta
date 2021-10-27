// info: import hooks and features
import { Link } from "react-router-dom";
import { useCallback, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../hooks/use-http";
import moment from "moment";

// info: components import
import Loader from "../components/ui/Loader";

//info: import of actions
import { uiActions } from "../store/ui/ui-slice";

// info: import styles
import styles from "../styles/Appointment/Appointment.module.css";
import btnstyles from "../styles/Button/PrimaryButton.module.css";
import icons from "../assets/images/sprite.svg";

const Appointment = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [fetchAppointments] = useHttp();
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const httpError = useSelector((state) => state.ui.httpError);
  const confirmDelete = useSelector((state) => state.ui.confirmDelete);
  const dispatch = useDispatch();

  const applyData = useCallback((data) => {
    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        mc: data[key].mc,
        firstAcolyte: data[key].firstAcolyte,
        secondAcolyte: data[key].secondAcolyte,
        crossBearer: data[key].crossBearer,
        thurifier: data[key].thurifier,
        boat: data[key].boat,
        date: data[key].date,
      });
    }
    setAppointments(loadedData);
  }, []);

  const deleteEventHandler = (id) => {
    dispatch(uiActions.openDeleteModal());
    props.onConfirmDelete(id);
  };

  useEffect(() => {
    fetchAppointments(
      {
        url: "https://shccknolta-default-rtdb.firebaseio.com//appointments.json",
      },
      applyData,
      false
    );
  }, [fetchAppointments, applyData, confirmDelete]);
  return (
    <section className={styles.appointment}>
      <Link to="/appointments/create" className={btnstyles.btn}>
        Add Appointment
      </Link>
      {loadingSpinner && <Loader />}
      {httpError && !loadingSpinner && (
        <h3 className="error__text">{httpError}</h3>
      )}
      {!httpError && !loadingSpinner && appointments.length === 0 && (
        <h3 className="error__text">No appointment available.</h3>
      )}
      {!loadingSpinner &&
        !httpError &&
        appointments.length !== 0 &&
        appointments.map((appointment) => (
          <Fragment key={appointment.id}>
            <h2>{moment(appointment.date).format("dddd, MMM Do YYYY")}</h2>
            <ul className={styles["appointment__list"]}>
              {appointment.mc && (
                <li>
                  <h3>MC</h3>
                  <h3>{appointment.mc}</h3>
                </li>
              )}
              {appointment.firstAcolyte && (
                <li>
                  <h3>First Acolyte</h3>
                  <h3>{appointment.firstAcolyte}</h3>
                </li>
              )}
              {appointment.secondAcolyte && (
                <li>
                  <h3>Second Acolyte</h3>
                  <h3>{appointment.secondAcolyte}</h3>
                </li>
              )}
              {appointment.crossBearer && (
                <li>
                  <h3>Cross Bearer</h3>
                  <h3>{appointment.crossBearer}</h3>
                </li>
              )}
              {appointment.thurifier && (
                <li>
                  <h3>Thurifier</h3>
                  <h3>{appointment.thurifier}</h3>
                </li>
              )}
              {appointment.boat && (
                <li>
                  <h3>Boat Bearer</h3>
                  <h3>{appointment.boat}</h3>
                </li>
              )}
            </ul>
            <div className="ta-right mr-1">
              <Link to={`/appointments/${appointment.id}/edit`}>
                <svg className="action__icons mr-1 ">
                  <use href={`${icons}#icon-pencil`}></use>
                </svg>
              </Link>

              <svg
                className="action__icons delete"
                onClick={deleteEventHandler.bind(null, appointment.id)}
              >
                <use href={`${icons}#icon-trash`}></use>
              </svg>
            </div>
          </Fragment>
        ))}
    </section>
  );
};

export default Appointment;
