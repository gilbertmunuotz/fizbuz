import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_API } from "../config/constant";
import { Transaction } from "../Interfaces/interface";

// Define a base query for RTK Query
const baseQuery = fetchBaseQuery({
    baseUrl: `${SERVER_API}/v1/transactions`,
    credentials: 'include', // Ensure cookies are sent
});

// Create an API slice
export const transactionAPISlice = createApi({
    reducerPath: "transactionAPI",
    tagTypes: ['Transaction'],
    baseQuery,
    endpoints: (build) => ({

        // First paramater Represents the Expected Return Data Type
        // Second parameter Represents the Passed Data Type

        // Get All Transactions Based on userId
        getTransaction: build.query<Transaction, number>({
            query: (id) => ({
                url: '/transactions',
                method: 'GET',
                body: id
            }),
            providesTags: ['Transaction']
        }),

        // Post New Transaction
        addTransaction: build.mutation<void, Transaction>({
            query: (transaction) => ({
                url: '/new',
                method: 'POST',
                body: transaction
            }),
            // Invalidate the Transaction tag to refetch relevant data
            invalidatesTags: ['Transaction'],
        }),

        // Delete Transaction Based on userId
        deleteTransaction: build.mutation<void, number>({
            query: (_id) => ({
                url: `/transaction/delete/${_id}`,
                method: 'DELETE',
            })
        }),


    })
});


// Export hooks for usage in functional components
export const { useAddTransactionMutation, useGetTransactionQuery, useDeleteTransactionMutation } = transactionAPISlice;