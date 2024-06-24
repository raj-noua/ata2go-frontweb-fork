import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, http } from "./api";

export const handleGetAllUsers = async () => {
    const response = await http.get(URLs.getAllUsers);
    return response.data;
};

export const handleGetLastLogin = async (id) => {
    const response = await http.get(URLs.getLastLogin(id));
    return response.data;
};

export const handleGetUserById = async (id) => {
    const response = await http.get(URLs.getUserById(id));
    return response.data;
};

export const handleReSendEmailVerify = async (data) => {
    const response = await http.patch(URLs.ReSendEmailVerify, data);
    return response.data;
};

export const handleReSendPassVerify = async (data) => {
    const response = await http.patch(URLs.ReSendPassVerify, data);
    return response.data;
};

export const handleTwoFaByAdmin = async (payload) => {
    const response = await http.patch(URLs.twoFaByAdmin, payload);
    return response.data;
};

export const handleUpdatePassUser = async (payload) => {
    const response = await http.patch(URLs.updatePassUser(payload), payload.data);
    return response.data;
};

export const handleUpdateUser = async (payload) => {
    const response = await http.patch(URLs.updateUser(payload), payload.data);
    return response.data;
};

export const handleUpdateUserInfo = async (payload) => {
    const response = await http.patch(URLs.updateUserInfo, payload);
    return response.data;
};

export const handleUpdateUsers = async (payload) => {
    const response = await http.patch(URLs.updateUsers, payload);
    return response.data;
};

export const handleDeleteUser = async (id) => {
    const response = await http.delete(URLs.deleteUser(id));
    return response.data;
};

export const handleUsersDelete = async (payload) => {
    const response = await http.delete(URLs.usersDelete, { data: payload });
    return response.data;
};

export const handleDeleteUsers = async (payload) => {
    const response = await http.post(URLs.deleteUsers, payload);
    return response.data;
};

export const handleSendCode = async (data) => {
    const response = await http.post(URLs.sendCode, data);
    return response.data;
};

export const handleSendSupport = async (data) => {
    const response = await http.post(URLs.sendSupport, data);
    return response.data;
};

export const handleSendTwoFactor = async (data) => {
    const response = await http.post(URLs.sendTwoFactor, data);
    return response.data;
};

export const handleSignin = async (data) => {
    const response = await http.post(URLs.signin, data);
    return response.data;
};

export const handleSignup = async (data) => {
    const response = await http.post(URLs.signup, data);
    return response.data;
};

export const handleVerifyCode = async (data) => {
    const response = await http.post(URLs.verifyCode, data);
    return response.data;
};

export const handleVerifyEmail = async (data) => {
    const response = await http.post(URLs.verifyEmail, data);
    return response.data;
};

export const handleVerifyTwoFaCode = async (data) => {
    const response = await http.post(URLs.verifyTwoFaCode, data);
    return response.data;
};

export const handleVerifyTwoFaMethod = async (data) => {
    const response = await http.post(URLs.verifyTwoFaMethod, data);
    return response.data;
};

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
