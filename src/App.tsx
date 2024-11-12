import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="w-full h-full">
      <Outlet />
      <Toaster 
        position={isMobile ? "top-center" : "bottom-left"} 
        reverseOrder={isMobile} 
      />
    </div>
  );
};

export default App;
