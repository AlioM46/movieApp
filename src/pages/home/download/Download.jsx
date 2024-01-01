import React from "react";
import {FaUser} from "react-icons/fa";
import phoneImage from "../../../assets/Download.png";
import "./download.css";
const Download = () => {
  return (
    <div className="home__download  section__margin ">
      <div className="home__download__text">
        <h2>Download Your Movies Watch Offline. Enjoy On Your Mobile</h2>
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries..
        </span>
        <div className="home__download__text__info">
          <p>HD 4K</p>
          <p>
            <FaUser />
            2K
          </p>
        </div>
      </div>
      <div className="home__download__image">
        <img src={phoneImage} alt="RandomImage" />
      </div>
    </div>
  );
};

export default Download;
