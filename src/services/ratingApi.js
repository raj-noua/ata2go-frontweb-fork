// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseUrl }                   from "./api";
// export const ratingApi = createApi({
//   reducerPath: "ratingApi",
//   baseQuery: fetchBaseQuery({ baseUrl: baseUrl + "/rating" }),
//   tagTypes: ["Rating", "Videos"],
//   endpoints: (builder) => ({
    //	getAllRating:       builder.query({    query: () =>       ({ url: "/",                method: "GET" }),            providesTags: ["Rating"] }),
    //	getVideoById:       builder.query({    query: id =>       ({ url: `/${id}`,           method: "GET" }),            providesTags: ["Rating"] }),
    //	addRating:          builder.mutation({ query: data =>     ({ url: "/",                method: "POST", body: data }), invalidatesTags: ["Rating", "Videos"] }),
    //	updateVideo:        builder.mutation({ query: payload =>  ({ url: `/${payload.id}`,   method: "PATCH", body: payload.data }), invalidatesTags: ["Rating"] }),
    //	deleteVideo:        builder.mutation({ query: id =>       ({ url: `/${id}`,           method: "DELETE" }),          invalidatesTags: ["Rating"] }),
//   }),
// });

// export const {
// //  useAddRatingMutation
// } = ratingApi;
