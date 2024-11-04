import { configureStore } from "@reduxjs/toolkit";
import { transactionAPISlice } from "../api/TransactionSlice";
import { authSlice } from "../api/AuthSlice";

//  Export The store
export const Store = configureStore({
    reducer: {
        // Add the Transaction API slice reducer here
        [transactionAPISlice.reducerPath]: transactionAPISlice.reducer,
        // Include Also the Auth API slice reducer
        [authSlice.reducerPath]: authSlice.reducer,
    },

    // Add the middleware for the API slice
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(transactionAPISlice.middleware, authSlice.middleware),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch;