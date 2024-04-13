import { USER_URL } from "@/constants/URLS";
import { apiSlice } from "./apiSlice";

export const userApiSlce = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApiSlce;
