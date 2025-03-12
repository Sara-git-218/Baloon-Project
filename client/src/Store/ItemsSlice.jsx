import { createSlice } from '@reduxjs/toolkit'

const initVal={
    arr:[]
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: initVal,
    reducers: {
        setval: (state, action) => {
            console.log("set");
            state.arr=action.payload
            console.log(state.arr);
            
        }
    }
})
export const {setval} = itemsSlice.actions
export default itemsSlice.reducer