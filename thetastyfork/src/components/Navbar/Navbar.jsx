import React, { useState } from "react";
import "./navbar.css";
import assets from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("menu");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reservation");
  };

  return (
    <div className="navbar">
      <img
        src={assets.logo}
        height="70px"
        width="70px"
        alt="logo"
        className="logo"
      />

      <ul className="navbar-menu">
        <li>
          {/* Use Link component for navigation */}
          <Link
            to="/"
            className={menu === "home" ? "active" : ""}
            onClick={() => setMenu("home")}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="/menu"
            className={menu === "menu" ? "active" : ""}
            onClick={() => setMenu("menu")}
          >
            MENU
          </Link>
        </li>
        <li>
          <Link
            to="/reviews"
            className={menu === "reviews" ? "active" : ""}
            onClick={() => setMenu("reviews")}
          >
            REVIEWS
          </Link>
        </li>
        <li>
          <Link
            to="/contactus"
            className={menu === "contactus" ? "active" : ""}
            onClick={() => setMenu("contactus")}
          >
            CONTACT US
          </Link>
        </li>
      </ul>
      {/* <button onClick={routeChange}>Reservations</button> */}
      <Link to="/reservation">
        <button onClick={handleClick}>Reservations</button>
      </Link>
    </div>
  );
};

export default Navbar;
