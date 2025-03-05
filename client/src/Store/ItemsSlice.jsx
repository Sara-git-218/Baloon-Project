import { createSlice } from '@reduxjs/toolkit'

const initVal={
    arr:[]
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: initVal,
    reducers: {
        set: (state, action) => {
            console.log("set");
            state.arr=action.payload
        },
        get: (state, action) => {
            console.log("get");
            return state.arr
        }
    }
})
export const {set,get} = itemsSlice.actions
export default itemsSlice.reducer