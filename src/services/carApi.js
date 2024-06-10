import { createApi, fetchBaseQuery }    from "@reduxjs/toolkit/query/react";
import { baseUrl }                      from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const carApi = createApi({
    reducerPath: "carApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/cars",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);    }
            return headers;
        }
    }),
    tagTypes: ["Cars"],
    endpoints: builder => ({
        getAllCars: builder.query({         query: () =>        ({ url: "/",                method: "GET" }),                       providesTags: ["Cars"] }),
        getCarsByUser: builder.query({      query: id =>        ({ url: `/userId/${id}`,    method: "GET" }),                       providesTags: ["Cars"] }),
        getCarById: builder.query({         query: id =>        ({ url: `/${id}`,           method: "GET" }),                       providesTags: ["Cars"] }),
        
        addCar: builder.mutation({          query: data =>      ({ url: "/",                method: "POST", body: data }),          invalidatesTags: ["Cars"] }),
        requestQuote: builder.mutation({    query: data =>      ({ url: `/requestForQuote`, method: "POST", body: data }),          invalidatesTags: ["Cars"] }),
        
        updateCars: builder.mutation({      query: payload =>   ({ url: `/${payload.id}`,   method: "PATCH", body: payload.data }), invalidatesTags: ["Cars"] }),
        
        deleteCar: builder.mutation({       query: id =>        ({ url: `/${id}`,           method: "DELETE" }),                    invalidatesTags: ["Cars"] })
    })
});

export const {
    useAddCarMutation,
    useDeleteCarMutation,
    useGetAllCarsQuery,
    useGetCarByIdQuery,
    useGetCarsByUserQuery,
    useRequestQuoteMutation,
    useUpdateCarsMutation
} = carApi;
