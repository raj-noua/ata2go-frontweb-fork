import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl }                   from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const videosApi = createApi({
    reducerPath: "videosApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/videos",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);    }
            return headers;
        }
    }),
    tagTypes: ["Videos", "Rating"],
    endpoints: builder => ({
        getAllVideos:           builder.query({    query: () =>       ({ url: "/",                method: "GET" }),                         providesTags: ["Videos", "Rating"] }),
        getAllVideosWithRating: builder.query({    query: () =>       ({ url: "/videoWithRating", method: "GET" }),                         providesTags: ["Videos", "Rating"] }),
        getVideoById:           builder.query({    query: id =>       ({ url: `/${id}`,           method: "GET" }),                         providesTags: ["Videos"] }),
        getVideosByUser:        builder.query({    query: id =>       ({ url: `/userId/${id}`,    method: "GET" }),                         providesTags: ["Videos"] }),
        
        addRating:              builder.mutation({ query: data =>     ({ url: `/rating`,          method: "POST", body: data }),            invalidatesTags: ["Videos"] }),
        uploadVideo:            builder.mutation({ query: data =>     ({ url: `/`,                method: "POST", body: data }),            invalidatesTags: ["Videos"] }),

        updateVideo:            builder.mutation({ query: payload =>  ({ url: `/${payload.id}`,   method: "PATCH", body: payload.data }),   invalidatesTags: ["Videos"] }),
        
        deleteVideo:            builder.mutation({ query: id =>       ({ url: `/${id}`,           method: "DELETE" }),                      invalidatesTags: ["Videos"] }),

        getVideosBySubCategory: builder.query({    query: subCategory => ({ url: `/subCategory/${subCategory}`, method: "GET" }), providesTags: ["Videos"] })
    })
});

export const {
    useAddRatingMutation,
    useDeleteVideoMutation,
    useGetAllVideosQuery,
    useGetAllVideosWithRatingQuery,
    useGetVideoByIdQuery,
    useGetVideosByUserQuery,
    useUpdateVideoMutation,
    useUploadVideoMutation,
    useGetVideosBySubCategoryQuery
} = videosApi;
