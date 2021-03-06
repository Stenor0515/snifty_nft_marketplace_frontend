import React from "react";
import Footer from "../footer";
import Header from "../header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex-1 min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
