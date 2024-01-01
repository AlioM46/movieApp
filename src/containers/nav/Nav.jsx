import React, {useEffect, useState} from "react";
import {
  CiBurger,
  CiHeart,
  CiMenuBurger,
  CiPhone,
  CiVideoOn,
} from "react-icons/ci";
import {FaDoorClosed, FaLeaf, FaUserCog} from "react-icons/fa";
import {FiSearch} from "react-icons/fi";
import {MdClose} from "react-icons/md";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaUsers,
  FaWhatsappSquare,
} from "react-icons/fa";

import {useSelector} from "react-redux";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import usePersist from "../../hooks/usePersist";
import "./nav.css";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const userInfo = useAuth();
  const [persist, setPersist] = usePersist();

  const linkStyle = (path) => ({
    color: pathname === path ? "red" : "inherit",
  });

  useEffect(() => {
    setSubMenu(false);
  }, [pathname]);

  const userInfoComp = (
    <div className="userInfo" onClick={() => setProfileToggle(!profileToggle)}>
      <img src={userInfo.profileImage} />
    </div>
  );

  const profilePopup = (
    <div className="profilePopup">
      <Link to={"/dashboard"}>Dashboard</Link>
      <button
        onClick={() => {
          setPersist(false);
          window.location.reload();
          window.location.pathname = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );

  return (
    <div className="nav container">
      <div className="nav__logo">
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
        <div className="nav__logo__input">
          <button>
            <FiSearch />
          </button>
          <input type="text" placeholder="Search Movie Name from here" />
          <div className="burger" onClick={() => setMenu(!menu)}>
            <CiMenuBurger />
          </div>
        </div>
      </div>
      {/*  HALF / HALF */}

      <ul className="nav__links">
        <li>
          <Link to={"/movies"} style={linkStyle("/movies")}>
            Movies
          </Link>
        </li>
        <li>
          <Link to={"/aboutUs"} style={linkStyle("/aboutUs")}>
            About us
          </Link>
        </li>
        <li>
          <Link to={"/contactUs"} style={linkStyle("/contactUs")}>
            Contact us
          </Link>
        </li>
        <li>
          <Link to={"/dashboard"} style={linkStyle("/dashboard")}>
            <FaUserCog />
          </Link>
        </li>

        {Object.values(userInfo).length ? (
          <div className="parentOfUserInfo">
            {userInfoComp}
            {profileToggle && profilePopup}
          </div>
        ) : (
          <li>
            <Link to={"/login"} style={linkStyle("/login")}>
              <FaDoorClosed />
            </Link>
          </li>
        )}
      </ul>

      <ul className={`nav__links nav__menu ${menu ? "nav__show" : ""}`}>
        <li>
          <Link to={"/movies"} style={linkStyle("/movies")}>
            Movies
          </Link>
        </li>
        <li>
          <Link to={"/dashboard"} style={linkStyle("/dashboard")}>
            Dashboard{" "}
          </Link>
        </li>
        <li>
          <Link to={"/aboutUs"} style={linkStyle("/aboutUs")}>
            {" "}
            <FaUsers />
          </Link>
        </li>
        <li>
          <Link to={"/contactUs"} style={linkStyle("/contactUs")}>
            {" "}
            <CiPhone />
          </Link>
        </li>
        {Object.values(userInfo).length ? (
          <div className="parentOfUserInfo">
            <button
              className="underline "
              onClick={() => {
                setPersist(false);
                window.location.reload();
                window.location.pathname = "/login";
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            {" "}
            <li>
              <Link to={"/login"} style={linkStyle("/login")}>
                <FaDoorClosed />
              </Link>
            </li>
          </div>
        )}
        <li>
          <button
            to={""}
            onClick={() => setSubMenu(true)}
            className="burger_nav"
          >
            <CiMenuBurger />
          </button>
        </li>
      </ul>

      <div className={`nav__subMenu ${subMenu ? "nav__subMenu__show" : ""}`}>
        <div className="nav__subMenu__logo">
          <img src={logo} alt="Logo" />
          <p onClick={() => setSubMenu(false)}>
            <MdClose />
          </p>
        </div>
        <ul className="nav__subMenu_links">
          <li>
            <Link style={linkStyle("/movies")} to={"/movies"}>
              <CiVideoOn />
              <span>Movies</span>
            </Link>
          </li>

          <li>
            <Link style={linkStyle("/aboutUs")} to={"/aboutUs"}>
              <FaUsers /> <span>About us</span>
            </Link>
          </li>
          <li>
            <Link style={linkStyle("/contactUs")} to={"/contactUs"}>
              <CiPhone /> <span>Contact us</span>
            </Link>
          </li>
          {/*  */}
          <li className="nav__subMenu__links__social">
            <Link to={"/"}>
              <FaFacebook />
            </Link>
            <Link to={"/"}>
              <FaInstagramSquare />
            </Link>
            <Link to={"/"}>
              <FaLinkedin />
            </Link>

            <Link to={"/"}>
              <FaWhatsappSquare />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
