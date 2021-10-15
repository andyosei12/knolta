import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { uiActions } from "../store/ui/ui-slice";
import styles from "../styles/Navbar/NavItems.module.css";

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
        <NavLink to="/events" className={styles["nav-item__link"]}>
          Upcoming Events
        </NavLink>
      </li>
      <li className={styles["nav-item"]}>
        <NavLink to="/appointment" className={styles["nav-item__link"]}>
          Appointments
        </NavLink>
      </li>
      <li className={styles["nav-item"]}>
        <NavLink to="/liturgy" className={styles["nav-item__link"]}>
          Liturgical Calendar
        </NavLink>
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
