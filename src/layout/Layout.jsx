import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const layout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default layout;
