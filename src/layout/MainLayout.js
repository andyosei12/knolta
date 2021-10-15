import React, { Fragment } from "react";
import Navbar from "../components/Navbar";

const MainLayout = (props) => {
  return (
    <Fragment>
      <Navbar />
      {props.children}
    </Fragment>
  );
};

export default MainLayout;
