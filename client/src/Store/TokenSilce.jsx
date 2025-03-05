import { createSlice } from '@reduxjs/toolkit'

const initVal={
    token:'ttttt'
}

const tokenSlice = createSlice({
    name: 'token',
    initialState: initVal,
    reducers: {
        set: (state, action) => {
            state.token=action
        },
        get: (state, action) => {
            return state.token
        }
    }
})
export const {set,get} = tokenSlice.actions
export default tokenSlice.reducer