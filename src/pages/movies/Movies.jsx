import React, {useCallback, useState} from "react";
import {Filter, MoviesRender} from "../index";
import "./movies.css";
const Movies = () => {
  const [filters, setFilters] = useState([]);

  return (
    <div className="movies  ">
      <Filter setFilters={setFilters} />
      <MoviesRender filters={filters} />
    </div>
  );
};

export default Movies;
