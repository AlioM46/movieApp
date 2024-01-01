import React, {useEffect, useRef} from "react";
import "./loadMoreBtn.css";

const LoadMoreBtn = ({setLoad, load, maxLoad}) => {
  const btn = useRef();

  const handleClick = () => {
    if (load < maxLoad) {
      setLoad((prev) => prev + 1);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (load === maxLoad) {
      btn.current.style.display = "none";
    } else {
      btn.current.style.display = "block";
    }
  }, [load, maxLoad]);

  return (
    <div className="load">
      <button ref={btn} onClick={() => handleClick()}>
        Load More Movies
      </button>
    </div>
  );
};

export default LoadMoreBtn;
