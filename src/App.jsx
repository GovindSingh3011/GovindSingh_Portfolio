import { Outlet } from "react-router";
import React, { useState, useEffect } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Preloader from "./components/PreLoader/PreLoader";
// import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        {/* <ScrollToTop /> */}
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
