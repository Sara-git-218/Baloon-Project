import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
const initVal = {
    // isLoggedIn: false,
    user: null
};


const userloginSlice = createSlice({
    name: 'userIn',
    initialState: initVal,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;

        }
    }
})

export const { setUser } = userloginSlice.actions
export default userloginSlice.reducer
