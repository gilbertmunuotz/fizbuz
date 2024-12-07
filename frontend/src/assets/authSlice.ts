import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../library/Store";
import { AuthState, AuthResponse } from "../Interfaces/interface";


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
        updateProfileSuccess: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        logoutSuccess: (state) => {
            state.isUserAuth = false;
            state.user = null;
            state.sessionID = null;
        }
    }
})

// Export Action
export const { loginSuccess, updateProfileSuccess, logoutSuccess } = authSlice.actions;


// Selector functions to access user information
export const isAuthenticated = (state: RootState) => state.auth.isUserAuth; // Check Auth State Selector
export const user = (state: RootState): AuthResponse => state.auth.user;  // Get User Info Selector

// Export SLice
export default authSlice.reducer;