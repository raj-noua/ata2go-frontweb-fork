import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl }                   from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const carRequestApi = createApi({
    reducerPath: "carRequestApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/carRequests",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);    }
            return headers;
        }
    }),
    tagTypes: ["carRequests"],
    endpoints: builder => ({
        getAllcarRequests:    builder.query({    query: () =>       ({ url: "/",                method: "GET" }),                       providesTags: ["carRequests"] }),
        getcarRequestsByUser: builder.query({    query: id =>       ({ url: `/user/${id}`,      method: "GET" }),                       providesTags: ["carRequests"] }),
        
        requestQuote:         builder.mutation({ query: data =>     ({ url: `/requestForQuote`, method: "POST", body: data }),          invalidatesTags: ["carRequests"] }),
        
        updatecarRequests:    builder.mutation({ query: payload =>  ({ url: `/${payload.id}`,   method: "PATCH", body: payload.data }), invalidatesTags: ["carRequests"] })

    })
});

export const { 
    useGetAllcarRequestsQuery, 
    useGetcarRequestsByUserQuery, 
    useRequestQuoteMutation,
    useUpdatecarRequestsMutation
} = carRequestApi;
