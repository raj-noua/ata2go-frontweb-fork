import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl }                   from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/auth",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);    }
            return headers;
        }
    }),
    tagTypes: ["User"],
    endpoints: builder => ({
        getAllUsers:         builder.query({    query: () =>       ({ url: "/getAllUsers",              method: "GET" }),                       providesTags: ["User"] }),
        getLastLogin:        builder.query({    query: id =>       ({ url: `/getLastLogin/${id}`,       method: "GET" }),                       providesTags: ["User"] }),
        getUserById:         builder.query({    query: id =>       ({ url: `/${id}`,                    method: "GET" }),                       providesTags: ["User"] }),
        
        ReSendEmailVerify:   builder.mutation({ query: data =>     ({ url: `/ReSendEmailVerify`,        method: "PATCH", body: data }),         invalidatesTags: ["User"] }),
        ReSendPassVerify:    builder.mutation({ query: data =>     ({ url: `/ReSendPassVerify`,         method: "PATCH", body: data }),         invalidatesTags: ["User"] }),
        twoFaByAdmin:        builder.mutation({ query: payload =>  ({ url: `/twoFaByAdmin`,             method: "PATCH", body: payload }),      invalidatesTags: ["User"] }),
        updatePassUser:      builder.mutation({ query: payload =>  ({ url: `updatePass/${payload.id}`,  method: "PATCH", body: payload.data }), invalidatesTags: ["User"] }),
        updateUser:          builder.mutation({ query: payload =>  ({ url: `/${payload.id}`,            method: "PATCH", body: payload.data }), invalidatesTags: ["User"] }),
        updateUserInfo:      builder.mutation({ query: payload =>  ({ url: `/updateUserInfo`,           method: "PATCH", body: payload }),      invalidatesTags: ["User"] }),
        updateUsers:         builder.mutation({ query: payload =>  ({ url: `/updateUsers`,              method: "PATCH", body: payload }),      invalidatesTags: ["User"] }),

        deleteUser:          builder.mutation({ query: id =>       ({ url: `/${id}`,                    method: "DELETE" }),                    invalidatesTags: ["User"] }),
        usersDelete:         builder.mutation({ query: payload =>  ({ url: `/usersDelete`,              method: "DELETE", body: payload }),     invalidatesTags: ["User"] }),
        
        deleteUsers:         builder.mutation({ query: payload =>  ({ url: `/deleteUsers`,              method: "POST", body: payload }),       invalidatesTags: ["User"] }),
        sendCode:            builder.mutation({ query: data =>     ({ url: `/sendVerificationCode`,     method: "POST", body: data }),          invalidatesTags: ["User"] }),
        sendSupport:         builder.mutation({ query: data =>     ({ url: `/sendMail`,                 method: "POST", body: data }),          invalidatesTags: ["User"] }),
        sendTwoFactor:       builder.mutation({ query: data =>     ({ url: `/sendTwoFactor`,            method: "POST", body: data }),          invalidatesTags: ["User"] }),
        signin:              builder.mutation({ query: data =>     ({ url: `/login`,                    method: "POST", body: data }),          invalidatesTags: ["User"] }),
        signup:              builder.mutation({ query: data =>     ({ url: "/register",                 method: "POST", body: data }),          invalidatesTags: ["User"] }),
        verifyCode:          builder.mutation({ query: data =>     ({ url: `/verifyCode`,               method: "POST", body: data }),          invalidatesTags: ["User"] }),
        verifyEmail:         builder.mutation({ query: data =>     ({ url: `/verifyEmail`,              method: "POST", body: data }),          invalidatesTags: ["User"] }),
        verifyTwoFaCode:     builder.mutation({ query: data =>     ({ url: `/verifyTwoFaCode`,          method: "POST", body: data }),          invalidatesTags: ["User"] }),
        verifyTwoFaMethod:   builder.mutation({ query: data =>     ({ url: `/verifyTwoFaMethod`,        method: "POST", body: data }),          invalidatesTags: ["User"] })
    })
});

export const {
    useDeleteUserMutation,
    useDeleteUsersMutation,
    useGetAllUsersQuery,
    useGetLastLoginQuery,
    useGetUserByIdQuery,
    useReSendEmailVerifyMutation,
    useReSendPassVerifyMutation,
    useSendCodeMutation,
    useSendSupportMutation,
    useSendTwoFactorMutation,
    useSigninMutation,
    useSignupMutation,
    useTwoFaByAdminMutation,
    useUpdatePassUserMutation,
    useUpdateUserMutation,
    useUpdateUserInfoMutation,
    useUpdateUsersMutation,
    useUsersDeleteMutation,
    useVerifyCodeMutation,
    useVerifyEmailMutation,
    useVerifyTwoFaCodeMutation,
    useVerifyTwoFaMethodMutation
} = usersApi;
