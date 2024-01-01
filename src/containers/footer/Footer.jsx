import React from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer  container ">
      <ul>
        <li>
          <h2>Company</h2>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">About us</Link>
        </li>
        <li>
          <Link to="/">Contact us</Link>
        </li>
        <li>
          <Link to="/">Movies</Link>
        </li>
      </ul>
      <ul>
        <li>
          <h2>Top Categories</h2>
        </li>
        <li>
          <Link to="/">Action</Link>
        </li>
        <li>
          <Link to="/">Romantic</Link>
        </li>
        <li>
          <Link to="/">Drama</Link>
        </li>
        <li>
          <Link to="/">Animation</Link>
        </li>
      </ul>
      <ul>
        <li>
          <h2>My Account</h2>
        </li>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/">My Favorites</Link>
        </li>
        <li>
          <Link to="/">Profile</Link>
        </li>
        <li>
          <Link to="/">Change Password</Link>
        </li>
      </ul>
      <ul>
        <li>
          <img src={logo} alt="LOGO" />
        </li>
        <p>
          Lorem 196 Andrew Road, Suite 200, New York, NY 10007 Tell: +255 754
          661 423 Email: info@zpunet.com
        </p>
      </ul>
    </div>
  );
};

export default Footer;
