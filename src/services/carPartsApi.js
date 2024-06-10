import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl }                   from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const carPartsApi = createApi({
    reducerPath: "carPartsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/carParts",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);    }
            return headers;
        }
    }),
    tagTypes: ["CarParts"],
    endpoints: builder => ({
        getAllCarParts:       builder.query({    query: () =>       ({ url: "/",                        method: "GET" }),                       providesTags: ["CarParts"] }),
        getCarPartById:       builder.query({    query: id =>       ({ url: `/${id}`,                   method: "GET" }),                       providesTags: ["CarParts"] }),
        getCarPartsByUser:    builder.query({    query: id =>       ({ url: `/userId/${id}`,            method: "GET" }),                       providesTags: ["CarParts"] }),
        
        addCarPart:           builder.mutation({ query: data =>     ({ url: "/",                        method: "POST", body: data }),          invalidatesTags: ["CarParts"] }),
        addRating:            builder.mutation({ query: data =>     ({ url: `/rating`,                  method: "POST", body: data }),          invalidatesTags: ["CarParts"] }),

        updateCarPart:        builder.mutation({ query: payload =>  ({ url: `/${payload.id}`,           method: "PATCH", body: payload.data }), invalidatesTags: ["CarParts"] }),
        updateCarPartsById:   builder.mutation({ query: payload =>  ({ url: `/subSystem/${payload.id}`, method: "PATCH", body: payload.data }), invalidatesTags: ["CarParts"] }),
        
        deleteCarPart:        builder.mutation({ query: id =>       ({ url: `/${id}`,                   method: "DELETE" }),                    invalidatesTags: ["CarParts"] })
    })
});

export const {
    useAddCarPartMutation,
    useAddRatingMutation, // *JJ
    useDeleteCarPartMutation,
    useGetAllCarPartsQuery,
    useGetCarPartByIdQuery,
    useGetCarPartsByUserQuery,
    useUpdateCarPartMutation,
    useUpdateCarPartsByIdMutation
} = carPartsApi;
