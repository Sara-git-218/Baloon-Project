import { createSlice } from '@reduxjs/toolkit'
const initVal = {
    isLoggedIn: false,
};

// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'LOGIN':
//             console.log('Login');
//             return { ...state, isLoggedIn: true };
//         case 'LOGOUT':
//             return { ...state, isLoggedIn: false };
//         default:
//             return state;
//     }
// };

const isloginSlice = createSlice({
    name: 'islogin',
    initialState: initVal,
    reducers: {
        setLogin: (state, action) => {
           
            state.isLoggedIn=!state.isLoggedIn
            console.log(state.isLoggedIn);
            
        }
    }
})
export const {setLogin} = isloginSlice.actions
export default isloginSlice.reducer
