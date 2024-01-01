import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import LikeBtn from "../LikeBtn/LikeBtn";
import "./movieCard.css";

const MovieCard = ({movie}) => {
  let url;
  if (movie?.backdropImage?.length > 500) {
    url = movie?.backdropImage;
  } else {
    url = `https://image.tmdb.org/t/p/original/${movie?.backdropImage}`;
  }

  return (
    <div className="movie__card">
      <Link to={`/movie/${movie?.id}`} className="abs__link"></Link>
      <img src={url} alt={movie?.overview} />
      <div className="movie__title">
        <h1>{movie?.title}</h1>
        <LikeBtn movieId={movie?.id || movie?._id} type={"icon"} />
      </div>
    </div>
  );
};

export default MovieCard;
