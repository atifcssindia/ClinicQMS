import React, { useEffect, useState } from "react";
import Header from "./components/header";
// import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { useSidebar } from "./services/SidebarContext";

const AdminLayout = ({ children }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  return (
    <div className="app-layout-classic flex flex-auto flex-col  bg-[#f4f5f5]">
      <div className="flex flex-auto min-w-0">
        <SideBar isOpen={isSidebarOpen} />
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full  transition-width duration-600">
          <Header toggleSidebar={toggleSidebar} />
          <div className="h-full flex flex-auto flex-col">
            <div className="h-full flex flex-auto flex-col justify-between">
              <main className="h-full">
                {/* Your main content */}
                {children}
              </main>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
