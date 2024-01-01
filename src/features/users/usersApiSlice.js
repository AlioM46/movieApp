import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice.js";

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (res) => {
        const loadedData = res?.users?.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedData);
      },

      providesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: ({userId}) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation} =
  usersApiSlice;

const selectUsersData = usersApiSlice.endpoints.getUsers.select();

const usersSelector = createSelector(selectUsersData, (res) => res?.data);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state) => usersSelector(state) ?? initialState);
