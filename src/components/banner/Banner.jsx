import React from "react";
import "./banner.css";
const Banner = ({title, img}) => {
  return (
    <div className="banner  ">
      <img src={img} alt="" />
      <h3>{title}</h3>
      <div className="banner__overlay"></div>
    </div>
  );
};

export default Banner;
