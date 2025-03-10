import React from "react";
import Navbar from "./components/Navbar/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Reviews from "./pages/Reviews/Reviews";
import Menu from "./pages/Menu/Menu";
import ContactUs from "./pages/ContactUs/ContactUs";
import Reservation from "./pages/Reservation/Reservation";

const App = () => {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
