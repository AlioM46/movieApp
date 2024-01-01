import React from "react";
import {FaMailBulk} from "react-icons/fa";
import {FaLocationDot, FaPhoneVolume} from "react-icons/fa6";
import aboutUsImage from "../../assets/AboutUs.jpg";
import Banner from "../../components/banner/Banner";
import {Cards} from "../index";
import "./contact.css";
const Contact = () => {
  return (
    <div className="contact ">
      <Banner img={aboutUsImage} title={"Contact Us"} />
      <div className="contact__container">
        <Cards
          icon={<FaMailBulk />}
          title={"Email Us"}
          type={"mailto:"}
          linkTo={"aliomaralsloom@gmail.com"}
          text={"Interactively grow backend ideas for cross-platform models"}
        />
        <Cards
          icon={<FaPhoneVolume />}
          title={"Call Us"}
          linkTo={"+966-58-118-2115"}
          type={"tel:"}
          text={
            "Distinctively exploit optimal alignments for intuitive bandwidth."
          }
        />
        <Cards
          icon={<FaLocationDot />}
          title={"Location"}
          text={"Dar es salaam, Tanzania. 345 Kigamboni, Street No. 12,"}
        />
      </div>
    </div>
  );
};

export default Contact;
