import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { SERVER_API } from "../config/constant";
import { Credentials, LoginUserInfo, SessionInfo } from "../Interfaces/interface";

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

        // Session Info
        useSessions: build.query<SessionInfo, number>({
            query: (id) => ({
                url: `/info/${id}`,
                method: 'GET'
            }),
            providesTags: ['Auth']
        })

    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUseSessionsQuery } = authSlice;