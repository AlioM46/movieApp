import React from "react";
import {RiFolderVideoFill} from "react-icons/ri";
import MovieCard from "../../../components/movieCard/MovieCard";
import "./popular.css";
const Popular = ({movies}) => {
  return (
    <div className="home__popular section__margin ">
      <div className="home__popular__title ">
        <RiFolderVideoFill />
        <h1>Popular Movies</h1>
      </div>
      <div className="home__popular__movies">
        {movies?.map((movie, index) => {
          return <MovieCard key={index} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default Popular;
