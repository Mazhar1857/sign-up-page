import { configureStore } from "@reduxjs/toolkit";
import loginCredentialsSlice from "./LoginCredentialsSlice";
import accInfoSlice from "./accInfoSlice";
import otpSlice from "./otp";
import profileInfoSlice from "./profileInfoSlice";
import loggedProfileSlice from "./loggedProfileSlice";

const store = configureStore({
    reducer: {
        'loginCredentials': loginCredentialsSlice.reducer,
        'info': accInfoSlice.reducer,
        'otp': otpSlice.reducer,
        'profiles': profileInfoSlice.reducer,
        'loggedProfile': loggedProfileSlice.reducer
    }
})

export default store;