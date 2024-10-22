import { configureStore } from "@reduxjs/toolkit";
import { transactionAPISlice } from "../api/TransactionSlice";


//  Export The store
export const Store = configureStore({
    reducer: {
        // Add the API slice reducer here
        [transactionAPISlice.reducerPath]: transactionAPISlice.reducer
    },

    // Add the middleware for the API slice
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(transactionAPISlice.middleware),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch;