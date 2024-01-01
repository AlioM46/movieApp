import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },

  reducers: {
    logOut: (state, action) => {
      state.token = null;
    },
    setToken: (state, action) => {
      const accessToken = action.payload;
      state.token = accessToken;
    },
  },
});

export default authSlice.reducer;

export const {logOut, setToken} = authSlice.actions;
