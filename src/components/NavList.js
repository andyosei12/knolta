import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavList.module.scss";

const NavList = ({ path, name, type }) => {
  return (
    <li className={styles["nav-item"]}>
      {!type && (
        <NavLink to={path} className={styles["nav-item__link"]}>
          {name}
        </NavLink>
      )}
      {type && (
        <a
          href={path}
          className={styles["nav-item__link"]}
          target="_blank"
          rel="noreferrer"
        >
          {name}
        </a>
      )}
    </li>
  );
};

export default NavList;
