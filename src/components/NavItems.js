import { useSelector } from "react-redux";
import styles from "../styles/Navbar/NavItems.module.css";

const NavItems = () => {
  const navMenu = useSelector((state) => state.ui.navMenuToggle);
  return (
    <ul
      className={`${
        !navMenu ? styles["nav-items"] : styles["nav-items__active"]
      }`}
    >
      <li className={styles["nav-item"]}>
        <a href="/home" className={styles["nav-item__link"]}>
          Upcoming Events
        </a>
      </li>
      <li className={styles["nav-item"]}>
        <a href="/home" className={styles["nav-item__link"]}>
          Appointments
        </a>
      </li>
      <li className={styles["nav-item"]}>
        <a href="/home" className={styles["nav-item__link"]}>
          Liturgical Calendar
        </a>
      </li>
      <li className={styles["nav-item"]}>
        <a href="/home" className={styles["nav-item__link"]}>
          Executives
        </a>
      </li>
    </ul>
  );
};

export default NavItems;
