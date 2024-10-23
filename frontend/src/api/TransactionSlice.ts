import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_API } from "../config/constant";

// Define a base query for RTK Query
const baseQuery = fetchBaseQuery({
    baseUrl: `${SERVER_API}/v1/transaction`
});

// Create an API slice
export const transactionAPISlice = createApi({
    reducerPath: "transactionAPI",
    tagTypes: ['Transaction'],
    baseQuery,
    endpoints: (build) => ({
        addNewTransaction: build.mutation({
            query: (transaction) => ({
                url: '/new',
                method: 'POST',
                body: transaction
            }),
            // Invalidate the Transaction tag to refetch relevant data
            invalidatesTags: ['Transaction'],
        })
    })
});


// Export hooks for usage in functional components
export const { useAddNewTransactionMutation } = transactionAPISlice;