import React from "react";
import "./input.css";
function Input({id, label, placeholder, setter, value, type, maxLength}) {
  let displayedValue = value;

  // if (maxLength && value.length > maxLength) {
  //   displayedValue = `${value.slice(0, maxLength)}........`;
  // }

  return (
    <div className="dashboard__input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={`${type === "password" ? "password" : "text"}`}
        value={value}
        onChange={(e) => {
          setter(e.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
