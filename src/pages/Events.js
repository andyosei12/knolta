import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/ui/Loader";

import btnstyles from "../styles/Button/PrimaryButton.module.css";
import eventstyles from "../styles/Events/Events.module.css";
import icons from "../assets/images/sprite.svg";
import { fetchEvent } from "../store/event-action";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const httpError = useSelector((state) => state.ui.httpError);
  useEffect(() => {
    dispatch(fetchEvent());
  }, [dispatch]);
  return (
    <section className={eventstyles.events}>
      <Link to="/events/create" className={btnstyles.btn}>
        Add Event
      </Link>
      {loadingSpinner && <Loader />}
      {httpError && !loadingSpinner && (
        <h3 className="error__text">{httpError}</h3>
      )}
      {!httpError && !loadingSpinner && events.length === 0 && (
        <h3 className="error__text">No event available.</h3>
      )}
      {!loadingSpinner && !httpError && events.length !== 0 && (
        <table className={eventstyles["events__table"]}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Venue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.venue}</td>
                <td>
                  <Link to={`/events/${item.id}/edit`} className="mr-1">
                    <svg className="action__icons">
                      <use href={`${icons}#icon-pencil`}></use>
                    </svg>
                  </Link>

                  <svg className="action__icons delete">
                    <use href={`${icons}#icon-trash`}></use>
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Events;
