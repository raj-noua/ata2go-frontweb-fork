import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl }                   from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const internetsApi = createApi({
    reducerPath: "internetsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/internets",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);    }
            return headers;
        }
    }),
    tagTypes: ["Internets"],
    endpoints: builder => ({
        getAllInternets:   builder.query({    query: () =>       ({ url: "/",                method: "GET" }),                       providesTags: ["Internets"] }),
        getInternetById:   builder.query({    query: id =>       ({ url: `/${id}`,           method: "GET" }),                       providesTags: ["Internets"] }),
        
        uploadInternet:    builder.mutation({ query: data =>     ({ url: "/",                method: "POST", body: data }),          invalidatesTags: ["Internets"] }),
        
        updateInternet:    builder.mutation({ query: payload =>  ({ url: `/${payload.id}`,   method: "PATCH", body: payload.data }), invalidatesTags: ["Internets"] }),
        
        deleteInternet:    builder.mutation({ query: id =>       ({ url: `/${id}`,           method: "DELETE" }),                    invalidatesTags: ["Internets"] })
    })
});

export const {
    useDeleteInternetMutation,
    useGetAllInternetsQuery,
    useGetInternetByIdQuery,
    useUpdateInternetMutation,
    useUploadInternetMutation
} = internetsApi;
