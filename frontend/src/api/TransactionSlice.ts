import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_API } from "../config/constant";
import { Transaction, TransactionResponse } from "../Interfaces/interface";

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
        getTransaction: build.query<TransactionResponse, number>({
            query: (id) => ({
                url: `/transactions/${id}`,
                method: 'GET',
            }),
            providesTags: ['Transaction']
        }),

        // Get Latest 3 Transactions Based on userId
        getTop3Transactions: build.query<TransactionResponse, number>({
            query: (id) => ({
                url: `/top3-transactions/${id}`,
                method: 'GET',
            }),
            providesTags: ['Transaction']
        }),

        // Post New Transaction Based on userId
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
            query: (id) => ({
                url: `/transaction/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Transaction']
        }),
    })
});


// Export hooks for usage in functional components
export const { useAddTransactionMutation, useGetTransactionQuery, useGetTop3TransactionsQuery, useDeleteTransactionMutation } = transactionAPISlice;