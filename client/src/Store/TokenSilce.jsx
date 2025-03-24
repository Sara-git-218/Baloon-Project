
import { createSlice } from '@reduxjs/toolkit'

const initVal={
    tokenstr:"sss"
}

const itemsSlice = createSlice({
    name: 'token',
    initialState: initVal,
    reducers: {
        setToken: (state, action) => {
            console.log("set");
            state.tokenstr=action.payload
            console.log(state.tokenstr);
            console.log("state.tokenstr");
        }
    }
})
export const {setToken} = itemsSlice.actions
export default itemsSlice.reducer