import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import moviesSlice from "../features/movies/moviesSlice";
import usersSlice from "../features/users/usersSlice";
import {apiSlice} from "./api/apiSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    movies: moviesSlice,
    auth: authSlice,
    user: usersSlice,
  },

  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
