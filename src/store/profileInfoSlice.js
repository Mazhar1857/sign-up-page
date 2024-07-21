import { createSlice } from "@reduxjs/toolkit";

const profileInfoSlice = createSlice({
    name: 'profiles',
    initialState: {
        'mazhar@gmail.com': {
            checkedCategory: ['Electronics', 'Tools', 'Jewelery', 'Kid', 'Outdoors', 'Automotive']
        },
        'ali@gmail.com': {
            checkedCategory: ['Industrial', 'Movies', 'Music', 'Books', 'Computers', 'Health', 'Grocery', 'Games', 'Sports']
        }
    },
    reducers: {
        setProfile: (state, action) => {
            return {
                ...state, ...action.payload
            }
        },
        setLocalProfile: (state, action) => {
            return {
                ...state, ...action.payload
            }
        }
    }
})
export default profileInfoSlice;
export const profileInfoAction = profileInfoSlice.actions;