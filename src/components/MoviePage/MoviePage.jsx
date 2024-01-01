import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {selectMovieById} from "../../features/movies/moviesSlice";
import "./moviePage.css";

const MoviePage = () => {
  const {id} = useParams();
  const movie = useSelector((state) => selectMovieById(state, id));
  const [width, setWidth] = useState(0);
  const myElementRef = useRef(null);

  useEffect(() => {
    if (myElementRef.current) {
      const elementWidth = myElementRef.current.clientWidth;
      setWidth(elementWidth);
    }
  }, [myElementRef]);

  let content;

  if (!movie) {
    content = (
      <div className="error__moviePage">
        <h2>No Movie Available!</h2>
      </div>
    );
  }

  if (movie) {
    content = (
      <div className="moviePage__movie">
        <iframe
          width={width}
          height={900}
          src={movie?.videoUrl}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div ref={myElementRef} className="moviePage">
      {content}
    </div>
  );
};

export default MoviePage;
