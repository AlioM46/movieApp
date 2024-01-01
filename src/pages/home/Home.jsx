import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
  selectPopularMovies,
  selectRatedMovies,
} from "../../features/movies/moviesSlice";
import {Download, Header, Popular, Rated} from "../index";
const Home = () => {
  const PopularMovies = useSelector(selectPopularMovies);
  const RatedMovies = useSelector(selectRatedMovies);

  return (
    <div className="home ">
      <Header movies={PopularMovies} />
      <Popular movies={PopularMovies} />
      <Download />
      <Rated movies={RatedMovies} />
    </div>
  );
};

export default Home;
