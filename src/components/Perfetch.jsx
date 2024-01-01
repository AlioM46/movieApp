import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {store} from "../app/store";
import {moviesApiSlice} from "../features/movies/moviesApiSlice";
import {usersApiSlice} from "../features/users/usersApiSlice";

const Perfetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", {force: true})
    );
    store.dispatch(
      moviesApiSlice.util.prefetch("getMovies", "moviesList", {force: true})
    );
  }, []);

  return <Outlet />;
};

export default Perfetch;
