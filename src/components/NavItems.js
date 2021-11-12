import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui/ui-slice";
import styles from "./NavItems.module.scss";
import NavList from "./NavList";

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
  { path: "/login", name: "Login" },
];

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
      {navLinks.map((navLink) => (
        <NavList
          key={navLink.name}
          path={navLink.path}
          name={navLink.name}
          type={navLink.type}
        />
      ))}
    </ul>
  );
};

export default NavItems;
