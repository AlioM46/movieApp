import React from "react";

import "./cards.css";
const Cards = ({linkTo, icon, title, text, type}) => {
  let link;

  if (linkTo) {
    link = <a href={`${type}${linkTo}`}>{linkTo}</a>;
  }

  return (
    <div className="card section__margin">
      <h3>{icon}</h3>
      <p>{title}</p>
      <div>
        {link}
        <span> {text}</span>
      </div>
    </div>
  );
};

export default Cards;
