import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import MovieCard from "../../../components/movieCard/MovieCard";
import {selectFilteredMovies} from "../../../features/movies/moviesSlice";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import "./moviesRender.css";
const MoviesRender = ({filters}) => {
  // Filtered && Paginationed List
  const filteredMovies = useSelector(selectFilteredMovies);
  const [moviesList, setMoviesList] = useState([]);
  const Limit = 20;
  const [load, setLoad] = useState(1);
  const maxLoad = Math.ceil(filteredMovies.length / Limit);

  useEffect(() => {
    setLoad(1);
  }, [filters]);

  useEffect(() => {
    if (filteredMovies.length) {
      setMoviesList(filteredMovies);
    }
  }, [filteredMovies]);

  useEffect(() => {
    if (filteredMovies.length) {
      setMoviesList(filteredMovies.slice(0, load * Limit));
    }
  }, [load, maxLoad, filteredMovies]);

  // If No Movies
  let errorElement;
  if (!moviesList.length || !moviesList) {
    errorElement = (
      <div className="movies__moviesRender__noItems">
        <p>Oops...! There's No Movies </p>
      </div>
    );
  }

  let content;
  if (moviesList.length) {
    content = moviesList.map((movie) => {
      return <MovieCard movie={movie} />;
    });
  }

  return (
    <div className="movie section__margin ">
      <div className="movie__container">{content}</div>
      {errorElement}
      {<LoadMoreBtn setLoad={setLoad} maxLoad={maxLoad} load={load} />}
    </div>
  );
};

export default MoviesRender;
