import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  console.log("Image path:", assets.food9);
  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${assets.food9})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="header-contents">
        <h2>THE TASTY FORK</h2>
        <p>Where Elegance Meets Flavor</p>
      </div>
    </div>
  );
};

export default Header;
