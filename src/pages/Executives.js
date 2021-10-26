import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import { Link } from "react-router-dom";

import Loader from "../components/ui/Loader";

// styles import
import btnstyles from "../styles/Button/PrimaryButton.module.css";
import execstyles from "../styles/Executives/Executive.module.css";

import icons from "../assets/images/sprite.svg";

const Executives = () => {
  const [executives, setExecutives] = useState([]);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const httpError = useSelector((state) => state.ui.httpError);
  const applyData = useCallback((data) => {
    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        name: data[key].name,
        position: data[key].position,
      });
    }
    setExecutives(loadedData);
  }, []);
  const [fetchEvent] = useHttp();
  useEffect(() => {
    fetchEvent(
      {
        url: "https://knolta-beb08-default-rtdb.firebaseio.com/executives.json",
      },
      applyData,
      false
    );
  }, [fetchEvent, applyData]);
  return (
    <section className={execstyles.executives}>
      <Link to="/executives/create" className={btnstyles.btn}>
        Add Executive
      </Link>

      {loadingSpinner && <Loader />}
      {httpError && !loadingSpinner && (
        <h3 className="error__text">{httpError}</h3>
      )}
      {!httpError && !loadingSpinner && executives.length === 0 && (
        <h3 className="error__text">No event available.</h3>
      )}

      {!loadingSpinner && !httpError && executives.length !== 0 && (
        <ul className={execstyles["executives__list"]}>
          {executives.map((executive) => (
            <li key={executive.id}>
              <h3>{executive.position}</h3>
              <h3>{executive.name}</h3>
              <Link to={`/executives/${executive.id}/edit`}>
                <svg className="action__icons">
                  <use href={`${icons}#icon-pencil`}></use>
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Executives;
