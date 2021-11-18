import React, { useEffect, useState, useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import { Link } from "react-router-dom";

import Loader from "../components/ui/Loader";

// styles import
import execstyles from "./Executives.module.scss";

import icons from "../assets/images/sprite.svg";
import AuthContext from "../auth/auth-context";

const Executives = () => {
  const [executives, setExecutives] = useState([]);
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const httpError = useSelector((state) => state.ui.httpError);
  const authCtx = useContext(AuthContext);
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
        url: "https://shccknolta-default-rtdb.firebaseio.com/executives.json",
      },
      applyData,
      false
    );
  }, [fetchEvent, applyData]);
  return (
    <section className={execstyles.executives}>
      <Link to="/executives/create" className="btn">
        Add Executive
      </Link>

      {loadingSpinner && <Loader />}
      {httpError && !loadingSpinner && (
        <h3 className="error__text">{httpError}</h3>
      )}
      {!httpError && !loadingSpinner && !executives && (
        <h3 className="error__text">No executive available.</h3>
      )}

      {!loadingSpinner && !httpError && executives.length !== 0 && (
        <ul className={execstyles["executives__list"]}>
          {executives.map((executive) => (
            <li key={executive.id}>
              <h3>{executive.position}</h3>
              <h3>{executive.name}</h3>
              {authCtx.isLoggedIn && (
                <Link to={`/executives/${executive.id}/edit`}>
                  <svg className="action__icons">
                    <use href={`${icons}#icon-pencil`}></use>
                  </svg>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Executives;
