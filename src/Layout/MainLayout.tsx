import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* add header Layout and footer here */}
      <header>Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
