import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl }                   from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/categories",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);    }
            return headers;
        }
    }),
    tagTypes: ["Categories", "Rating"],
    endpoints: builder => ({
        getAllCategories:    builder.query({    query: () =>       ({ url: "/",                  method: "GET" }),                       providesTags: ["Categories", "Rating"] }),
        getCategoriesByUser: builder.query({    query: id =>       ({ url: `/userId/${id}`,      method: "GET" }),                       providesTags: ["Categories"] }),
        getCategoryById:     builder.query({    query: id =>       ({ url: `/${id}`,             method: "GET" }),                       providesTags: ["Categories"] }),
        
        addCategory:         builder.mutation({ query: data =>     ({ url: "/",                  method: "POST", body: data }),          invalidatesTags: ["Categories"] }),
        addRating:           builder.mutation({ query: data =>     ({ url: `/rating`,            method: "POST", body: data }),          invalidatesTags: ["Categories"] }),

        updateCategory:      builder.mutation({ query: payload =>  ({ url: `/${payload.id}`,     method: "PATCH", body: payload.data }), invalidatesTags: ["Categories"] }),
        
        deleteCategory:      builder.mutation({ query: id =>       ({ url: `/${id}`,             method: "DELETE" }),                    invalidatesTags: ["Categories"] })
    })
});

export const {
    useAddCategoryMutation,
    useAddRatingMutation, //*JJ
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery,
    useGetCategoriesByUserQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation
} = categoriesApi;
