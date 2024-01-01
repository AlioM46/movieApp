import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";

const moviesAdapter = createEntityAdapter();

const initialState = moviesAdapter.getInitialState();

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    getMovies: builder.query({
      query: () => ({
        url: "/movies",
      }),
      transformResponse: (resData) => {
        const loadedData = resData?.data?.map((movie) => {
          movie.id = movie._id;
          return movie;
        });
        return moviesAdapter.setAll(initialState, loadedData);
      },
      providesTags: ["Movie"],
    }),

    //
    uploadMovie: builder.mutation({
      query: (data) => ({
        url: "/movies",
        method: "POST",
        body: {...data},
      }),

      invalidatesTags: ["Movie"],
    }),

    saveMovie: builder.mutation({
      query: (data) => ({
        url: "/movies/favorites",
        method: "POST",
        body: {...data},
      }),

      invalidatesTags: ["Movie", "User"],
    }),

    deleteMovie: builder.mutation({
      query: ({movieId}) => ({
        url: `/movies/${movieId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Movie"],
    }),

    selectFavoritesMovies: builder.query({
      query: (id) => ({
        url: `/movies/favoritesMovies/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Movie"],
    }),

    //
  }),
});

export const {
  useGetMoviesQuery,
  useUploadMovieMutation,
  useSaveMovieMutation,
  useDeleteMovieMutation,
  useSelectFavoritesMoviesQuery,
} = moviesApiSlice;

// Select Movies Result

const selectMoviesResult = moviesApiSlice.endpoints.getMovies.select();

// Create Selector

const moviesSelector = createSelector(selectMoviesResult, (res) => res?.data);

export const {
  selectAll: selectAllMovies,
  selectById: selectMovieById,
  selectIds: selectMoviesIds,
} = moviesAdapter.getSelectors(
  (state) => moviesSelector(state) ?? initialState
);
