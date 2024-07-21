import { createSlice } from "@reduxjs/toolkit";

const loggedProfileSlice = createSlice({
    name: 'loggedProfile',
    initialState: null,
    reducers: {
        setLoggedProfile: (state, action) => {
            return action.payload;
        }
    }
})

export default loggedProfileSlice;
export const loggedProfileAction = loggedProfileSlice.actions