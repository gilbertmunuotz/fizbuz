import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../Interfaces/interface";
import { RootState } from "../library/Store";


// Define Initial State
const initialState: AuthState = {
    isUserAuth: false,
    user: null,
    sessionID: null
}

// Create Auth Slice Logic
const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isUserAuth = true;
            state.user = action.payload.user;
            state.sessionID = action.payload.sessionID;
        },
        logout: (state) => {
            state.isUserAuth = false;
            state.user = null;
            state.sessionID = null;
        }
    }
})

// Export Action
export const { loginSuccess, logout } = authSlice.actions;


// Selector functions to access user information
export const isAuthenticated = (state: RootState) => state.auth.isUserAuth; // Auth State Selector

// Export SLice
export default authSlice.reducer;