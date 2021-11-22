import React, { Fragment } from "react";
import Header from "../components/Header";
// import Navbar from "../components/Navbar";

const MainLayout = (props) => {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default MainLayout;
