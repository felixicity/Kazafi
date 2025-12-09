import { apiSlice } from "../apiSlice";
const USERS_URL = "http://localhost:5000/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            login: builder.mutation({
                  query: (data) => ({
                        url: `${USERS_URL}/login`,
                        method: "POST",
                        body: data,
                  }),
            }),
            logout: builder.mutation({
                  query: () => ({
                        url: `${USERS_URL}/logout`,
                        method: "POST",
                  }),
            }),
            register: builder.mutation({
                  query: (data) => ({
                        url: `${USERS_URL}/register`,
                        method: "POST",
                        body: data,
                  }),
            }),
            getUserProfile: builder.query({
                  query: () => ({
                        url: `${USERS_URL}/profile`,
                        method: "GET",
                  }),
            }),
            EditUserProfile: builder.mutation({
                  query: (data) => ({
                        url: `${USERS_URL}/profile`,
                        method: "PUT",
                        body: data,
                  }),
            }),
      }),
});

export const {
      useLoginMutation,
      useLogoutMutation,
      useRegisterMutation,
      useGetUserProfileQuery,
      useEditUserProfileMutation,
} = usersApiSlice;
