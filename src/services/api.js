import Axios from "axios";

// export const baseUrl = "http://localhost:5000/api/v1";
export const baseUrl = "https://ata2go-backend.vercel.app/api/v1";

const URLs = {
    getAllUsers: "/getAllUsers",
    getLastLogin: (id) => `/getLastLogin/${id}`,
    getUserById: (id) => `/${id}`,
    ReSendEmailVerify: "/ReSendEmailVerify",
    ReSendPassVerify: "/ReSendPassVerify",
    twoFaByAdmin: "/twoFaByAdmin",
    updatePassUser: (payload) => `/updatePass/${payload.id}`,
    updateUser: (payload) => `/${payload.id}`,
    updateUserInfo: "/updateUserInfo",
    updateUsers: "/updateUsers",
    deleteUser: (id) => `/${id}`,
    usersDelete: "/usersDelete",
    deleteUsers: "/deleteUsers",
    sendCode: "/sendVerificationCode",
    sendSupport: "/sendMail",
    sendTwoFactor: "/sendTwoFactor",
    signin: "/login",
    signup: "/register",
    verifyCode: "/verifyCode",
    verifyEmail: "/verifyEmail",
    verifyTwoFaCode: "/verifyTwoFaCode",
    verifyTwoFaMethod: "/verifyTwoFaMethod",
};

export const http = Axios.create({
    baseURL: "https://ata2go-backend.vercel.app/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});