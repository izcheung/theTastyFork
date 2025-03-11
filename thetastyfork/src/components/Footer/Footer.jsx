import React from "react";
import { assets } from "../../assets/assets";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} width="70px" height="70px" />
          <p>Loreamfdklsajfl</p>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>Contact us</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>123-456-7890</li>
            <li>email@example.com</li>
          </ul>
        </div>
      </div>
      <hr></hr>
      <p className="footer-copyright">Copyright 2025</p>
    </div>
  );
};

export default Footer;
