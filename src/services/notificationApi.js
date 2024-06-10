import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl }                   from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/notifications",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);    }
            return headers;
        }
    }),
    tagTypes: ["notifications"],
    endpoints: builder => ({
        getNotificationsByUserId: builder.query({    query: id =>       ({ url: `/userId/${id}`,    method: "GET" }),               providesTags: ["notifications"] }),
        
        addNotifications:         builder.mutation({ query: data =>     ({ url: "/",                method: "POST", body: data }),  invalidatesTags: ["notifications"] })
    })
});

export const { 
    useAddNotificationsMutation, 
    useGetNotificationsByUserIdQuery 
} = notificationApi;
