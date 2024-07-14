import React from "react";
import NavigationBar from "./NavigationBar";

const DefaultLayout = ({ children, pagetitle }) => {
  return (
    <div className="h-screen max-w-2xl mx-auto">
      <NavigationBar/>
      <div className="pagetitle">{pagetitle}</div>
      <div className=" pagebox">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
