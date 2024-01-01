import {createSlice, current} from "@reduxjs/toolkit";

const categoryFilter = (state, action) => {
  return action.payload.includes(state.filters.category);
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    filteredMovies: [],
    sortOnPopularity: [],
    sortOnVote: [],
    filters: {
      date: null,
      rate: null,
      category: null,
    },
  },

  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
      state.filteredMovies = Object.values(action.payload.entities);
    },

    filter: (state, action) => {
      const {date, rate, category} = state.filters;
      let {entities} = state.movies;
      entities = Object.values(entities);

      state.filteredMovies = entities?.filter((item) => {
        const itemDate = new Date(item.releaseDate).getFullYear();
        const itemRate = Math.round(item.voteAverage / 2);
        const itemCategory = item.genreList;

        const categoryMatch = category
          ? categoryFilter(state, {payload: itemCategory})
            ? item
            : false
          : true;

        const dateMatch = date
          ? itemDate <= date[0] && itemDate >= date[1]
            ? item
            : false
          : true;

        const rateMatch = rate ? (itemRate == rate ? item : false) : true;

        return categoryMatch && dateMatch && rateMatch;
      });
    },

    sortOnPopularity: (state, action) => {
      const {entities} = state.movies;
      const MoviesEntities = Object.values(entities);
      MoviesEntities.sort((a, b) => b.popularity - a.popularity);
      state.sortOnPopularity = MoviesEntities.slice(0, 8);
    },
    sortOnVote: (state, action) => {
      const {entities} = state.movies;
      const moviesEntities = Object.values(entities);
      moviesEntities.sort((a, b) => b.voteAverage - a.voteAverage);
      state.sortOnVote = moviesEntities.slice(0, 8);
    },

    setDateFilter: (state, action) => {
      state.filters.date = action.payload;
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setRateFilter: (state, action) => {
      state.filters.rate = action.payload;
    },
  },
});

export const {
  setMovies,
  setDateFilter,
  setCategory,
  setRateFilter,
  sortOnPopularity,
  sortOnVote,
  filter,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectPopularMovies = (state) => state.movies.sortOnPopularity;
export const selectRatedMovies = (state) => state.movies.sortOnVote;
export const selectFilteredMovies = (state) => state.movies.filteredMovies;
export const selectAllMovies = (state) => state?.movies?.movies?.entities;
export const selectMovieById = (state, id) => {
  const movie = state?.movies?.movies?.entities;
  if (movie) {
    return movie[id];
  } else {
    return null;
  }
};
