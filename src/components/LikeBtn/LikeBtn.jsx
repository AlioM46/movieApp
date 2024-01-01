import React, {useEffect, useState} from "react";
import {FaHeart} from "react-icons/fa";
import {useSelector} from "react-redux";
import {useSaveMovieMutation} from "../../features/movies/moviesApiSlice";
import {selectUserById} from "../../features/users/usersSlice";
import useAuth from "../../hooks/useAuth";
import ErrorElement from "../ErrorElement/ErrorElement";
import SuccessElement from "../successElement/SuccessElement";
import "./likeBtn.css";
export default function LikeBtn({type, movieId}) {
  const [isLiked, setIsLiked] = useState(false);
  const [saveMoive, {data, isLoading, isError, isSuccess, error}] =
    useSaveMovieMutation();
  const {id} = useAuth();

  const handleSaveMovie = async () => {
    try {
      const res = await saveMoive({userId: id, movieId}).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const user = useSelector((state) => selectUserById(state, id));

  useEffect(() => {
    if (user?.favoritesMovies?.includes(movieId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [user, id]);

  let errorElement;
  let successElement;
  if (isError) {
    errorElement = <ErrorElement error={error?.data?.message} />;
  }

  if (isSuccess) {
    successElement = <SuccessElement success={data?.message} />;
  }

  let content;

  content = type == "icon" ? <FaHeart /> : "Watch";

  const SpecialStyle = {
    backgroundColor: !isLiked && "rgba(255,255,255,.4)",
    color: !isLiked && "red",
  };

  return (
    <>
      {successElement}
      {errorElement}
      <button
        style={SpecialStyle}
        onClick={handleSaveMovie}
        className={`button__like  `}
      >
        {content}
      </button>
    </>
  );
}
