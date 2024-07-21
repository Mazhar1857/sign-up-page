import { createSlice } from "@reduxjs/toolkit";

const otpSlice = createSlice({
    name: 'otp',
    initialState: null,
    reducers: {
        setOtp: (state, action) => {
            return action.payload;
        }
    }
})

export default otpSlice;
export const otpAction = otpSlice.actions;