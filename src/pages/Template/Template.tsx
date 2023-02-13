import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
export const Template: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
