import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header>Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
