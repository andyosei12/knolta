import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Navbar/Navbar.module.css";
import logo from "../assets/images/knolta.jpg";
import icons from "../assets/images/sprite.svg";
import NavItems from "./NavItems";
import { uiActions } from "../store/ui/ui-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navMenu = useSelector((state) => state.ui.navMenuToggle);
  const toggleNavMenuItems = () => {
    dispatch(uiActions.openNavMenu());
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar__logo"]}>
        <img alt="knolta logo" src={logo} className={styles.logo} />
        <h3>Sacred Heart Catholic Church, Knolta</h3>
      </div>
      <div>
        <svg className={styles.menu} onClick={toggleNavMenuItems}>
          <use
            href={`${icons}${!navMenu ? "#icon-menu" : "#icon-cross"}`}
          ></use>
        </svg>
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
