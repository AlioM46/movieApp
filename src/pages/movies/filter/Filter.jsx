import React, {useEffect, useState, useTransition} from "react";
import {IoArrowDown} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import GenreIds from "../../../config/GENRE_IDS.json";
import {
  filter,
  selectFilteredMovies,
  setCategory,
  setDateFilter,
  setRateFilter,
} from "../../../features/movies/moviesSlice";
import "./filter.css";
// Vote  , Popularity , genres , ReleaseDate
const years = [
  "2024 - 2020",
  "2019 - 2015",
  "2014 - 2010",
  "2009 - 2000",
  "1999 - 1900",
];

const rate = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];

const Filter = ({setFilters}) => {
  const [show, setShow] = useState({
    vote: false,
    date: false,
    genre: false,
  });
  const dispatch = useDispatch();

  // For Styling the LI's if its matched
  const [genreResult, setGenreResult] = useState("");
  const [dateResult, setDateResult] = useState("");
  const [voteResult, setVoteResult] = useState("");

  useEffect(() => {
    setFilters([genreResult, dateResult, voteResult]);
  }, [genreResult, dateResult, voteResult]);

  const style = (value, equalsTo) => {
    if (value == equalsTo) {
      return {
        color: "white",
        backgroundColor: "red",
      };
    }
  };

  const handleFilterByDate = (date) => {
    dispatch(setDateFilter(date));
    dispatch(filter());
  };

  const handleFilterByRate = (rate) => {
    dispatch(setRateFilter(rate));
    dispatch(filter());
  };

  const handleFilterByCategory = (category) => {
    dispatch(setCategory(category));
    dispatch(filter());
  };

  const genres = Object.values(GenreIds.genres);
  const genresFilter = genres.map((item) => {
    return (
      <li
        style={style(item.name, genreResult)}
        onClick={(e) => {
          setGenreResult(item.name);
          // Push The Category To Redux for Filtering
          handleFilterByCategory(item.name);
        }}
        value={item.name}
      >
        {item.name}
      </li>
    );
  });
  const rateFilter = rate.map((item) => {
    return (
      <li
        style={style(item, voteResult)}
        onClick={() => {
          setVoteResult(item);
          handleFilterByRate(parseInt(item));
        }}
        value={parseInt(item)}
      >
        {item}
      </li>
    );
  });

  const dateFilter = years.map((item) => {
    return (
      <li
        style={style(item, dateResult)}
        onClick={() => {
          setDateResult(item);
          handleFilterByDate(item.split(" - "));
        }}
        value={item.split(" - ")}
      >
        {item}
      </li>
    );
  });

  const handleToggle = (name) => {
    setShow((prev) => ({...prev, [name]: !prev[name]}));
  };

  return (
    <div className="movies__filter ">
      <div onClick={() => handleToggle("genre")}>
        <button>{genreResult ? genreResult : "Category"}</button>
        <IoArrowDown />
        {show.genre && (
          <ul>
            <li
              style={style("ALL", genreResult)}
              onClick={(e) => {
                setGenreResult(e.target.innerHTML);
                handleFilterByCategory(null);
              }}
            >
              ALL
            </li>
            {genresFilter}
          </ul>
        )}
      </div>
      <div onClick={() => handleToggle("date")}>
        <button>{dateResult ? dateResult : "Sort By Year"}</button>
        <IoArrowDown />
        {show.date && (
          <ul>
            <li
              onClick={(e) => {
                setDateResult(e.target.innerHTML);
                handleFilterByDate(null);
              }}
            >
              ALL
            </li>
            {dateFilter}
          </ul>
        )}
      </div>
      <div onClick={() => handleToggle("vote")}>
        <button>{voteResult ? voteResult : "Sort By Rates"}</button>
        <IoArrowDown />
        {show.vote && (
          <ul>
            {" "}
            <li
              onClick={(e) => {
                setVoteResult(e.target.value);
                handleFilterByRate(null);
              }}
            >
              ALL
            </li>
            {rateFilter}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
