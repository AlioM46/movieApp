import React, {useEffect, useRef} from "react";
import "./errorElement.css";

const ErrorElement = ({error}) => {
  const errorElement = useRef();

  useEffect(() => {
    setTimeout(() => {
      errorElement.current.style.display = "none";
    }, 5000);
  }, [errorElement, error]);

  return (
    <div ref={errorElement} className="error slide-in-fwd-center">
      <p>{error}</p>
    </div>
  );
};

export default ErrorElement;
