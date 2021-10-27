import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../components/ui/Loader";
import styles from "../styles/Liturgy/Liturgy.module.css";
import useHttp from "../hooks/use-http";

const Liturgy = () => {
  const loadingSpinner = useSelector((state) => state.ui.loadingSpinner);
  const httpError = useSelector((state) => state.ui.httpError);
  const [fetchData] = useHttp();
  const [liturgyData, setLiturgyData] = useState(null);

  const applyData = (data) => {
    setLiturgyData({
      date: new Date(data.date),
      liturgy: data.celebrations[0],
      week: data.season_week,
      season: data.season,
      day: data.weekday,
    });
  };

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
            <h3>{moment(liturgyData.date).format("do MMMM,YYYY")}</h3>
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
