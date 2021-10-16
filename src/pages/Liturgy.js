import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui/ui-slice";
import Loader from "../components/ui/Loader";
import styles from "../styles/Liturgy/Liturgy.module.css";

const Liturgy = () => {
  const dispatch = useDispatch();
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const [liturgyData, setLiturgyData] = useState(null);
  const [error, setError] = useState("");

  const fetchLiturgy = useCallback(async () => {
    dispatch(uiActions.showLoadingSpinner());
    try {
      const response = await fetch(
        "http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setLiturgyData({
        date: data.date,
        liturgy: data.celebrations[0],
        week: data.season_week,
        season: data.season,
        day: data.weekday,
      });
      dispatch(uiActions.closeLoadingSpinner());
    } catch (error) {
      dispatch(uiActions.closeLoadingSpinner());
      setError(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchLiturgy();
  }, [fetchLiturgy]);

  return (
    <section className={styles.liturgy}>
      {loadingSpinner && <Loader />}
      {error && <p>{error}</p>}
      {liturgyData && !error && (
        <Fragment>
          <div className={styles["liturgy__header"]}>
            <h3>{liturgyData.date}</h3>
            <h3>{liturgyData.day}</h3>
          </div>
          <div className={styles["liturgy__season"]}>
            <h3>{liturgyData.season} Season</h3>
            <h3>Week {liturgyData.week}</h3>
          </div>
          <div className={styles["liturgy__details"]}>
            <div>
              <h3 className={styles["liturgy__celebration"]}>
                {liturgyData.liturgy.title}
              </h3>
              <h1>{liturgyData.liturgy.rank}</h1>
            </div>
            <div className={styles["liturgy__details-color"]}>
              <h3>{liturgyData.liturgy.colour}</h3>
              <h3 style={{ backgroundColor: `${liturgyData.liturgy.colour}` }}>
                &nbsp;
              </h3>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Liturgy;
