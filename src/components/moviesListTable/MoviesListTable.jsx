import React from "react";
import {FaEye} from "react-icons/fa";
import {FaDeleteLeft} from "react-icons/fa6";
import {Link} from "react-router-dom";
import {useDeleteMovieMutation} from "../../features/movies/moviesApiSlice";
import ErrorElement from "../ErrorElement/ErrorElement";
import SuccessElement from "../successElement/SuccessElement";
import "./moviesListTable.css";

const MoviesListTable = ({
  image,
  name,
  category,
  language,
  year,
  actions,
  id,
}) => {
  const [deleteMovie, {data, isSuccess, isError, error}] =
    useDeleteMovieMutation();

  const handleDeleteMovie = async () => {
    try {
      const res = await deleteMovie({movieId: id}).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  let content;

  if (isError) {
    content = <ErrorElement error={error?.data?.message} />;
  }
  if (isSuccess) {
    content = <SuccessElement success={data?.message} />;
  }

  const displayCategory = category
    .slice(0, 2)
    .toString()
    .replaceAll(",", " , ");

  let url;
  if (image?.length > 500) {
    url = image;
  } else {
    url = `https://image.tmdb.org/t/p/original/${image}`;
  }
  const displayDate = new Date(year).getFullYear();
  return (
    <>
      {content}
      <tr className="moviesList__dashboard__tr">
        <td>
          <img src={url} alt={name} />
        </td>
        <td>{name}</td>
        <td>{displayCategory}</td>
        <td>{language}</td>
        <td>{displayDate}</td>
        <td className="actions">
          <button
            onClick={() => handleDeleteMovie()}
            className="dashboard__delete"
          >
            <FaDeleteLeft />
          </button>
          <Link to={`/movie/${id}`} className="dashboard__visit">
            <FaEye />
          </Link>
        </td>
      </tr>
    </>
  );
};

export default MoviesListTable;
