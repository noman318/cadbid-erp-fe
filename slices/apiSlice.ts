import { BASE_URL } from "@/constants/URLS";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["hsn", "company", "user"],
  endpoints: (builder) => ({}),
});
