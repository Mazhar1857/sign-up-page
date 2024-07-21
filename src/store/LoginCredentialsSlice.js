import { createSlice } from "@reduxjs/toolkit";

const loginCredentialsSlice = createSlice({
    name: 'loginCredentials',
    initialState: {
        'mazhar@gmail.com': {
            username: 'mazhar',
            email: 'mazhar@gmail.com',
            password: '123456789'
        },
        'ali@gmail.com': {
            username: 'ali',
            email: 'ali@gmail.com',
            password: '987654321'
        }
    },
    reducers: {
        setCredential: (state, action) => {
            const email = action.payload.email;
            return { ...state, [email]: action.payload }
        },

        setLocalCredential: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export default loginCredentialsSlice;
export const loginCredentialsAction = loginCredentialsSlice.actions;