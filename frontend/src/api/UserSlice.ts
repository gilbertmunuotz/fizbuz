import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { SERVER_API } from "../config/constant";
import { UserResponse, UserInfo } from "../Interfaces/interface";

const baseQuery = fetchBaseQuery({
    baseUrl: `${SERVER_API}/v1/users`,
    credentials: 'include',
});

export const userSlice = createApi({
    reducerPath: "userAPI",
    tagTypes: ['User'],
    baseQuery,

    endpoints: (build) => ({
        // Get user Info
        getUserInfo: build.query<UserResponse, number>({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET',
            }),
            providesTags: ['User']
        }),

        // Update user Informations
        updateUser: build.mutation<void, UserInfo>({
            query: (user) => ({
                url: `/user/update`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUserInfoQuery, useUpdateUserMutation } = userSlice;