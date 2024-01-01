import React, {useEffect, useRef} from "react";
import "./successElement.css";

const SuccessElement = ({success}) => {
  const successElement = useRef();

  useEffect(() => {
    setTimeout(() => {
      successElement.current.style.display = "none";
    }, 5000);
  }, [successElement, success]);

  return (
    <div ref={successElement} className="success slide-in-fwd-center">
      <p>{success}</p>
    </div>
  );
};

export default SuccessElement;
