/* eslint-disable react/prop-types */
import React from "react";
import { useLocation } from "react-router-dom";
import "./custom.css";
import CustomBar from "../Navbar/Navbar";

function MainLayout({ children }) {
  const isHome = useLocation().pathname === "/";
  return (
    <>
      <CustomBar />
      <main>{children}</main>

      {children && !isHome ? <footer id="bottom" className="mt-4" /> : null}
    </>
  );
}

export default MainLayout;
