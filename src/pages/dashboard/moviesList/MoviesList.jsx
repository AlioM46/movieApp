import React from "react";
import {useSelector} from "react-redux";
import Table from "../../../components/Table/Table";
import Thead from "../../../components/Thead/Thead";
import MoviesListTable from "../../../components/moviesListTable/MoviesListTable";
import {selectAllMovies} from "../../../features/movies/moviesSlice";
import "./moviesList.css";
const MoviesList = () => {
  const moviesList = useSelector(selectAllMovies);

  let content;
  content = Object.values(moviesList).length ? (
    Object.values(moviesList).map((item) => {
      return (
        <MoviesListTable
          image={item.backdropImage}
          name={item.title}
          category={item.genreList}
          language={item.originalLanguage}
          year={item.releaseDate}
          id={item?.id}
        />
      );
    })
  ) : (
    <h2 className="moviesList__erorr">No Movies Available</h2>
  );

  return (
    <div className="moviesList">
      <Table>
        <Thead>
          <th>IMAGE</th>
          <th>NAME</th>
          <th>CATEGORY</th>
          <th>LANGUAGE</th>
          <th>YEAR</th>
          <th>ACTIONS</th>
        </Thead>
        <tbody>{content}</tbody>
      </Table>
    </div>
  );
};

export default MoviesList;
