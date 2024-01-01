import React from "react";
import {FaListAlt, FaUsers} from "react-icons/fa";
import {useSelector} from "react-redux";
import GenreIds from "../../../config/GENRE_IDS.json";
import {selectAllMovies} from "../../../features/movies/moviesSlice";
import {selectAllUsers} from "../../../features/users/usersSlice";
import "./statistic.css";

const Statistic = () => {
  const movies = useSelector(selectAllMovies);
  const users = useSelector(selectAllUsers);

  const moviesLength = movies && Object.values(movies).length;
  const usersLength = users && Object.values(users)?.length;
  const genreIdsLength = GenreIds ? GenreIds.genres.length : 0;

  let content;
  let allCont;
  if (users && movies) {
    allCont = (
      <div className="statistic">
        {content}

        <div className="statistic__card">
          <p>{<FaListAlt />}</p>
          <div>
            <p>Total Movies</p>
            <span>{moviesLength}</span>
          </div>
        </div>
        <div className="statistic__card">
          <p>{<FaUsers />}</p>
          <div>
            <p>Total Users</p>
            <span>{usersLength}</span>
          </div>
        </div>
        <div className="statistic__card">
          <p>{<FaListAlt />}</p>
          <div>
            <p>Total Categories</p>
            <span>{genreIdsLength}</span>
          </div>
        </div>
      </div>
    );
  }

  return allCont;
};

export default Statistic;
