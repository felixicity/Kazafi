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
      }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
