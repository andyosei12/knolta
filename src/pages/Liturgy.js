import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/ui/Loader";
import styles from "../styles/Liturgy/Liturgy.module.css";
import useHttp from "../hooks/use-http";

const Liturgy = () => {
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const httpError = useSelector((state) => state.ui.httpError);
  const [fetchData] = useHttp();
  const [liturgyData, setLiturgyData] = useState(null);

  const applyData = async (data) => {
    try {
      const liturgy = await data;
      setLiturgyData({
        date: new Date(liturgy.date),
        liturgy: liturgy.celebrations[0],
        week: liturgy.season_week,
        season: liturgy.season,
        day: liturgy.weekday,
      });
    } catch (error) {}
  };
  let date;
  if (liturgyData) {
    const year = liturgyData.date.getFullYear();
    const day = `${liturgyData.date.getDate()}`.padStart(2, 0);
    // const month = `${liturgyData.date.getMonth() + 1}`.padStart(2, 0);
    const month = liturgyData.date.toLocaleString("default", {
      month: "short",
    });
    date = `${day}-${month}-${year}`;
  }

  useEffect(() => {
    fetchData(
      {
        url: "http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/today",
      },
      applyData
    );
  }, [fetchData]);

  return (
    <section className={styles.liturgy}>
      {loadingSpinner && <Loader />}
      {httpError && <p>{httpError}</p>}
      {liturgyData && !httpError && !loadingSpinner && (
        <Fragment>
          <div className={styles["liturgy__header"]}>
            <h3>{date}</h3>
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
