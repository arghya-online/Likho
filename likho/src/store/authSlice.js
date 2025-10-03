import {createSlice} from '@reduxjs/toolkit';

//this is to track user authentication state
const initialState = {
    status: false,
    userData: null,
}

//AuthSlice manages authentication in the store.
// It saves user info on login and clears it on logout.

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login:(state, action) => {
            state.status = true;
            state.userData = action.payload;
        }
        logout:(state) => {
            state.status = false;
            state.userData = null;
        }
    }

    export const {login, logout} = authSlice.actions;
})