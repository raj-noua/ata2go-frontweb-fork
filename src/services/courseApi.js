import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl }                   from "./api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const coursesApi = createApi({
    reducerPath: "coursesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl + "/courses",

        prepareHeaders: headers => {
            const token = getTokenFromLocalStorage();
            if (token) {    headers.set("Authorization", `Bearer ${token}`);    }
            return headers;
        }
    }),
    tagTypes: ["Courses"],
    endpoints: builder => ({
        getAllCourses:   builder.query({    query: () =>       ({ url: "/",                method: "GET" }),                        providesTags: ["Courses"] }),
        getCourseById:   builder.query({    query: id =>       ({ url: `/${id}`,           method: "GET" }),                        providesTags: ["Courses"] }),
        
        uploadCourse:    builder.mutation({ query: data =>     ({ url: "/",                method: "POST", body: data }),           invalidatesTags: ["Courses"] }),
        
        updateCourse:    builder.mutation({ query: payload =>  ({ url: `/${payload.id}`,   method: "PATCH", body: payload.data }),  invalidatesTags: ["Courses"] }),
        
        deleteCourse:    builder.mutation({ query: id =>       ({ url: `/${id}`,           method: "DELETE" }),                     invalidatesTags: ["Courses"] })
    })
});

export const { 
    useDeleteCourseMutation,
    useGetAllCoursesQuery,
    useGetCourseByIdQuery,
    useUpdateCourseMutation,
    useUploadCourseMutation
} = coursesApi;
