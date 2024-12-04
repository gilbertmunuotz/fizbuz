import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { SERVER_API } from "../config/constant";
import { Credentials, LoginUserInfo } from "../Interfaces/interface";

const baseQuery = fetchBaseQuery({
    baseUrl: `${SERVER_API}/v1/auth`,
    credentials: 'include',
});

export const authSlice = createApi({
    reducerPath: "authAPI",
    tagTypes: ['Auth'],
    baseQuery,

    endpoints: (build) => ({

        // Registration
        register: build.mutation<void, Credentials>({
            query: (credentials) => ({
                url: `/register`,
                method: 'POST',
                body: credentials,
            })
        }),

        login: build.mutation<void, LoginUserInfo>({
            query: (credentials) => ({
                url: `/login`,
                method: 'POST',
                body: credentials,
            })
        }),

        logout: build.mutation<void, void>({
            query: () => ({
                url: `/logout`,
                method: 'DELETE',
            }),
        }),

    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authSlice;