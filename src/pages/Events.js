import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import moment from "moment";
import Loader from "../components/ui/Loader";

import eventstyles from "./Events.module.scss";
import icons from "../assets/images/sprite.svg";
import { eventActions } from "../store/events-slice";
import { uiActions } from "../store/ui/ui-slice";

const Events = (props) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const confirmDelete = useSelector((state) => state.ui.confirmDelete);
  const httpError = useSelector((state) => state.ui.httpError);
  const applyData = useCallback(
    (data) => {
      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          venue: data[key].venue,
          date: data[key].date,
        });
      }
      dispatch(eventActions.getEvents(loadedData));
    },
    [dispatch]
  );
  const [fetchEvent] = useHttp();
  useEffect(() => {
    fetchEvent(
      {
        url: "https://shccknolta-default-rtdb.firebaseio.com/events.json",
      },
      applyData,
      false
    );
  }, [fetchEvent, applyData, confirmDelete]);

  const deleteEventHandler = (id) => {
    dispatch(uiActions.openDeleteModal());
    props.onConfirmDelete(id);
  };

  return (
    <section className={eventstyles.events}>
      <Link to="/events/create" className="btn">
        Add Event
      </Link>
      {loadingSpinner && <Loader />}
      {httpError && !loadingSpinner && (
        <h3 className="error__text">{httpError}</h3>
      )}
      {!httpError && !loadingSpinner && !events && (
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
                <td>{moment(item.date).format("MMM Do, YYYY")}</td>
                <td>{item.name}</td>
                <td>{item.venue}</td>
                <td>
                  <Link to={`/events/${item.id}/edit`} className="mr-1">
                    <svg className="action__icons">
                      <use href={`${icons}#icon-pencil`}></use>
                    </svg>
                  </Link>

                  <svg
                    className="action__icons delete"
                    onClick={deleteEventHandler.bind(null, item.id)}
                  >
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
