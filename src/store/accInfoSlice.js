import { createSlice } from "@reduxjs/toolkit";

const accInfoSlice = createSlice({
    name: 'info',
    initialState: {
        username: '',
        email: '',
        password: ''
    },
    reducers: {
        setAccInfo: (state, action) => {
            return action.payload;
        }
    }
})

export default accInfoSlice;
export const accInfoAction = accInfoSlice.actions