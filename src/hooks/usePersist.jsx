import React, {useEffect, useState} from "react";

const usePersist = () => {
  const [persist, setPersist] = useState(
    JSON.parse(window.localStorage.getItem("persist")) || false
  );

  useEffect(() => {
    window.localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
