import { createApi, fetchBaseQuery }    from "@reduxjs/toolkit/query/react";
import { baseUrl }                      from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const affiliatesApi = createApi({
    reducerPath: "affiliatesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/affiliate",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);   }
            return headers;
        }
    }),
    tagTypes: ["Affiliate"],
    endpoints: builder => ({
        getAffiliateById: builder.query({       query: id =>       ({ url: `/${id}`,                method: "GET" }),                       providesTags: ["Affiliate"] }),
        getAllAffiliates: builder.query({       query: () =>       ({ url: "/getAllAffiliates",     method: "GET" }),                       providesTags: ["Affiliate"] }),
        getLastLogin: builder.query({           query: id =>       ({ url: `/getLastLogin/${id}`,   method: "GET" }),                       providesTags: ["Affiliate"] }),

        deleteAffiliate: builder.mutation({     query: id =>       ({ url: `/${id}`,                method: "DELETE" }),                    invalidatesTags: ["Affiliate"] }),
        
        ReSendEmailVerify: builder.mutation({   query: data =>     ({ url: `/ReSendEmailVerify`,    method: "PATCH", body: data }),         invalidatesTags: ["Affiliate"] }),
        ReSendPassVerify: builder.mutation({    query: data =>     ({ url: `/ReSendPassVerify`,     method: "PATCH", body: data }),         invalidatesTags: ["Affiliate"] }),
        updateAffiliate: builder.mutation({     query: payload =>  ({ url: `/${payload.id}`,        method: "PATCH", body: payload.data }), invalidatesTags: ["Affiliate"] }),
        
        signin: builder.mutation({              query: data =>     ({ url: `/login`,                method: "POST", body: data }),          invalidatesTags: ["Affiliate"] }),
        signup: builder.mutation({              query: data =>     ({ url: "/register",             method: "POST", body: data }),          invalidatesTags: ["Affiliate"] }),
        sendCode: builder.mutation({            query: data =>     ({ url: `/sendVerificationCode`, method: "POST", body: data }),          invalidatesTags: ["Affiliate"] }),
        sendSupport: builder.mutation({         query: data =>     ({ url: `/sendMail`,             method: "POST", body: data }),          invalidatesTags: ["Affiliate"] }),
        sendTwoFactor: builder.mutation({       query: data =>     ({ url: `/sendTwoFactor`,        method: "POST", body: data }),          invalidatesTags: ["Affiliate"] }),
        verifyCode: builder.mutation({          query: data =>     ({ url: `/verifyCode`,           method: "POST", body: data }),          invalidatesTags: ["Affiliate"] }),
        verifyEmail: builder.mutation({         query: data =>     ({ url: `/verifyEmail`,          method: "POST", body: data }),          invalidatesTags: ["Affiliate"] }),
        verifyTwoFaCode: builder.mutation({     query: data =>     ({ url: `/verifyTwoFaCode`,      method: "POST", body: data }),          invalidatesTags: ["Affiliate"] })
    })
});

export const {
    AffiliateSendEmailVerifyMutation,
    useDeleteAffiliateMutation,
    useGetAffiliateByIdQuery,
    useGetAllAffiliatesQuery,
    useGetLastLoginQuery,
    useReSendPassVerifyMutation,
    useSendCodeMutation,
    useSendSupportMutation,
    useSendTwoFactorMutation,
    useSigninMutation,
    useSignupMutation,
    useUpdateAffiliateMutation,
    useVerifyCodeMutation,
    useVerifyEmailMutation,
    useVerifyTwoFaCodeMutation
} = affiliatesApi;
