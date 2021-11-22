import { Fragment, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthContext from "../auth/auth-context";
import { uiActions } from "../store/ui/ui-slice";
import icon from "../assets/images/sprite.svg";
import styles from "./NavItems.module.scss";
import NavList from "./NavList";

const NavItems = () => {
  const navMenu = useSelector((state) => state.ui.navMenuToggle);
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  const toggleNavMenu = () => {
    dispatch(uiActions.openNavMenu());
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  const closeNavMenuHandler = () => {
    dispatch(uiActions.closeNavMenu());
  };

  const navLinks = [
    { path: "/home", name: "Home" },
    { path: "/events", name: "Events" },
    { path: "/appointments", name: "Appointments" },
    { path: "/executives", name: "Executives" },
    {
      path: "https://bible.usccb.org/readings/calendar",
      name: "Liturgical Calendar",
      type: "external",
    },
    {
      path: `${!authCtx.isLoggedIn ? "/login" : "/home"}`,
      name: `${!authCtx.isLoggedIn ? "Login" : "Logout"}`,
      logout: `${!authCtx.isLoggedIn ? "" : "logout"}`,
    },
  ];
  return (
    <Fragment>
      <button
        aria-controls="primary-navigation"
        aria-expanded={navMenu}
        className={styles["mobile-nav-toggle"]}
        onClick={toggleNavMenu}
      >
        <span className="sr-only">Menu</span>
        <svg className={styles["nav-icon"]}>
          <use href={`${icon}${!navMenu ? "#icon-menu" : "#icon-cross"}`}></use>
        </svg>
      </button>
      <ul
        id="primary-navigation"
        data-visible={`${navMenu ? "true" : "false"}`}
        className={styles["nav-items"]}
        onClick={closeNavMenuHandler}
      >
        {navLinks.map((navLink) => (
          <NavList
            key={navLink.name}
            path={navLink.path}
            name={navLink.name}
            type={navLink.type}
            onLogout={logoutHandler}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default NavItems;
