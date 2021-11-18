import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthContext from "../auth/auth-context";
import { uiActions } from "../store/ui/ui-slice";
import styles from "./NavItems.module.scss";
import NavList from "./NavList";

const NavItems = () => {
  const navMenu = useSelector((state) => state.ui.navMenuToggle);
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

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
    <ul
      className={`${
        !navMenu ? styles["nav-items"] : styles["nav-items__active"]
      }`}
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
  );
};

export default NavItems;
