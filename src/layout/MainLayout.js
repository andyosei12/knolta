import React, { Fragment } from "react";
import Navbar from "../components/Navbar";

const MainLayout = (props) => {
  return (
    <Fragment>
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default MainLayout;
