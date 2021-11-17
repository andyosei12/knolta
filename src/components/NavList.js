import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavList.module.scss";

const NavList = ({ path, name, type, onLogout }) => {
  return (
    <Fragment>
      <li className={styles["nav-item"]}>
        {!type && name !== "Logout" && (
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
        {!type && name === "Logout" && (
          <NavLink
            to={path}
            className={styles["nav-item__link"]}
            onClick={onLogout}
          >
            {name}
          </NavLink>
        )}
      </li>
    </Fragment>
  );
};

export default NavList;
