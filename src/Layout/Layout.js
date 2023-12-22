import React from "react";
import { Outlet } from "react-router-dom";
import AntdSidebar from "../components/AntdSidebar/AntdSidebar";

const Layout = () => {
  return (
    <>
      <AntdSidebar />
      <Outlet />
    </>
  );
};

export default Layout;
