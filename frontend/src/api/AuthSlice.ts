import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { SERVER_API } from "../config/constant";

const baseQuery = fetchBaseQuery({
    baseUrl: `${SERVER_API}/v1/auth`,
    credentials: 'include',
})