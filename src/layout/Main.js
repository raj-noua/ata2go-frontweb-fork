import React      from "react";
import { Outlet } from "react-router-dom";
import Navbar     from "../pages/Header/SiteNavBar/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Main;
