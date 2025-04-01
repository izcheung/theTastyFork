import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Reviews from "./pages/Reviews/Reviews";
import Menu from "./pages/Menu/Menu";
import ContactUs from "./pages/ContactUs/ContactUs";
import Reservation from "./pages/Reservation/Reservation";
import AdminContacts from "./pages/AdminContactUs/AdminContact";
import AdminReservation from "./pages/AdminReservation/AdminReservation";

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
          <Route path="/admin/contact-page" element={<AdminContacts />} />
          <Route path="/admin/reservations" element={<AdminReservation />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
