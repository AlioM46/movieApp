import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ErrorElement from "../../../components/ErrorElement/ErrorElement";
import MovieCard from "../../../components/movieCard/MovieCard";
import Spinner from "../../../components/spinner/Spinner";
import {useSelectFavoritesMoviesQuery} from "../../../features/movies/moviesApiSlice";
import useAuth from "../../../hooks/useAuth";
import "./favoriteMovies.css";
const FavoritesMovies = () => {
  const {id} = useAuth();
  const {
    data: movies,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useSelectFavoritesMoviesQuery(id);

  let content;

  if (isLoading) {
    content = <Spinner />;
  }

  if (isError) {
    content = <ErrorElement error={error?.data?.message} />;
  }
  if (isSuccess) {
    content = movies?.movies?.map((item) => {
      return <MovieCard movie={item} liked={true} />;
    });
  }

  if (!movies?.movies.length) {
    return (
      <div className="favoritesMovies__error">
        <h1>😓</h1>
        <p>No Favorites Movies.</p>
      </div>
    );
  }
  return <div className="dashboard__favorites">{content}</div>;
};

export default FavoritesMovies;
