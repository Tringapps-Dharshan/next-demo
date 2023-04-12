import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper";

interface Action{
    payload: {
        user: {
            firstName: string,
            lastName: string,
            emailId: string,
            mobileNo: string,
            password: string,
            confirm: string
        }
    }
}

const initialState = {
    users: []
}

export const createUserSlice = createSlice({
    name: 'createUser',
    initialState: initialState,
    reducers: {
        createUser: (state:any, action:Action) => {
            state.users = [...state.users, action.payload];
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action:Action) => {
            return {
                ...state,
                ...action.payload.user,
            }
        }
    }
})

export const { createUser } = createUserSlice.actions;
export const selectUsers = (state:any) => state.users?.value;
export default createUserSlice.reducer;