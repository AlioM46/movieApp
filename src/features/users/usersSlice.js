import {createSlice} from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "user",
  initialState: {users: []},
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const {setUsers} = usersSlice.actions;

export const selectAllUsers = (state) => {
  return state?.user?.users?.entities;
};

export const selectUserById = (state, id) => {
  const users = state?.user?.users?.entities;
  if (users) {
    return users[id];
  }
  return null; // or any default value based on your requirements
};
