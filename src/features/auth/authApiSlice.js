import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice.js";

const authAdapter = createEntityAdapter({});
const initialState = authAdapter.getInitialState();

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: {...credentials},
      }),
      providesTags: ["Auth"],
    }),
    // Register
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth",
        method: "PATCH",
      }),
      invalidatesTags: ["Auth"],
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApiSlice;

// const selectAuthData = authApiSlice.endpoints.login.select();

// const AuthSelector = createSelector(() => {
//   selectAuthData, (res) => res?.data;
// });

// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUsersIds,
// } = usersApiSlice.getSelectors((state) => AuthSelector(state) ?? initialState);
