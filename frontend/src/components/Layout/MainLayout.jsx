/* eslint-disable react/prop-types */
import React from "react";
import "./custom.css";
import CustomBar from "../Navbar/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <CustomBar />
      <main>{children}</main>

      {/* {!isHome ? <footer id="bottom" className="mt-4" /> : null} */}
    </>
  );
}

export default MainLayout;
