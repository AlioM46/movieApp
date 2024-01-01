import React from "react";
import aboutUsImage from "../../assets/AboutUs.jpg";
import Banner from "../../components/banner/Banner";
import {Welcome} from "../index";
import "./about.css";
const About = () => {
  return (
    <div className=" about">
      <Banner title={"Who We Are?"} img={aboutUsImage} />
      <Welcome />
    </div>
  );
};

export default About;
