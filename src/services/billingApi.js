import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./api";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const billingApi = createApi({
  reducerPath: "billingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + "/billings",

    prepareHeaders: (headers) => {
      const token = getTokenFromLocalStorage();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Billings", "Courses", "Internets"],
  endpoints: (builder) => ({
    getAllBillings: builder.query({
      query: () => ({ url: "/", method: "GET" }),
      providesTags: ["Billings", "Courses", "internets"],
    }),
    createInvoice: builder.mutation({ 
      query: data => ({ url: "/", method: "POST", body: data }),
      invalidatesTags: ["Billings"],
    }),
    updateInvoice: builder.mutation({ 
      query: payload => ({ url: `/${payload.id}`, method: "PATCH", body: payload.data }),
      invalidatesTags: ["Billings"] 
    }),
  }),
});

export const { 
  useGetAllBillingsQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation, 
} = billingApi;
