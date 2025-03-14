import { Outlet } from "react-router-dom";
import React from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
// import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  );
}

export default App;
