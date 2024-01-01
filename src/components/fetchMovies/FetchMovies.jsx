import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {useGetMoviesQuery} from "../../features/movies/moviesApiSlice";
import {
  setMovies,
  sortOnPopularity,
  sortOnVote,
} from "../../features/movies/moviesSlice";
import {useGetUsersQuery} from "../../features/users/usersApiSlice";
import {setUsers} from "../../features/users/usersSlice";
import ErrorElement from "../ErrorElement/ErrorElement";
import Spinner from "../spinner/Spinner";

// Update ********************************************************
// This Components Also used for fetching users
// I forget that :)
// I'm Not gonna rename it, that's take a long time.
// Update ********************************************************

const FetchMovies = () => {
  const {data, isError, error, isSuccess, isLoading, isFetching} =
    useGetMoviesQuery("moviesList", {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      pollingInterval: 15000,
    });

  const {
    data: users,
    isError: isErrorU,
    isSuccess: isSuccessU,
    error: errorU,
    isLoading: isLoadingU,
    isFetching: isFetchingU,
  } = useGetUsersQuery("usersList", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 15000,
  });

  //

  const dispatch = useDispatch();
  // This Components for Wrapping The Movies Elements in Router App

  let content;
  if (isLoading || isLoadingU || isFetching || isFetchingU) {
    content = <Spinner />;
  }

  if (isError || isErrorU) {
    content = (
      <ErrorElement
        error={
          error?.message ||
          error?.data?.message ||
          error?.error ||
          errorU?.data?.message ||
          errorU?.message
        }
      />
    );
  }

  useEffect(() => {
    if (isSuccessU) {
      dispatch(setUsers(users));
    }
  }, [isSuccessU, users]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setMovies(data));
      dispatch(sortOnPopularity(data));
      dispatch(sortOnVote(data));
    }
  }, [isSuccess, data]);

  if (isSuccess && isSuccessU) {
    return <Outlet />;
  } else {
    return content;
  }
};

export default FetchMovies;
