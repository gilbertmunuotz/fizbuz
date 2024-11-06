import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { SERVER_API } from "../config/constant";
import { Credentials, UserInfo } from "../Interfaces/interface";

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

        login: build.mutation<void, UserInfo>({
            query: (credentials) => ({
                url: `/login`,
                method: 'POST',
                body: credentials,
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation } = authSlice;