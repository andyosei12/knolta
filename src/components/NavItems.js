import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { uiActions } from "../store/ui/ui-slice";
import styles from "./NavItems.module.scss";

const NavItems = () => {
  const navMenu = useSelector((state) => state.ui.navMenuToggle);
  const dispatch = useDispatch();

  const closeNavMenuHandler = () => {
    dispatch(uiActions.closeNavMenu());
  };
  return (
    <ul
      className={`${
        !navMenu ? styles["nav-items"] : styles["nav-items__active"]
      }`}
      onClick={closeNavMenuHandler}
    >
      <li className={styles["nav-item"]}>
        <NavLink to="/home" className={styles["nav-item__link"]}>
          Home
        </NavLink>
      </li>
      <li className={styles["nav-item"]}>
        <NavLink to="/events" className={styles["nav-item__link"]}>
          Upcoming Events
        </NavLink>
      </li>
      <li className={styles["nav-item"]}>
        <NavLink to="/appointments" className={styles["nav-item__link"]}>
          Appointments
        </NavLink>
      </li>
      <li className={styles["nav-item"]}>
        <a
          href="https://bible.usccb.org/readings/calendar"
          className={styles["nav-item__link"]}
          target="_blank"
          rel="noreferrer"
        >
          Liturgical Calendar
        </a>
      </li>
      <li className={styles["nav-item"]}>
        <NavLink to="/executives" className={styles["nav-item__link"]}>
          Executives
        </NavLink>
      </li>
    </ul>
  );
};

export default NavItems;
