import { createSlice } from "@reduxjs/toolkit";

const cardDepmodifier = createSlice({
    name: 'cardDepmodifier',
    initialState:{
        addItem: false,
    },
    reducers:{
        getAllCardDepmodifierSlice: (state, action) => {
            return {
                ...state,
                payload: action.payload,
                addItem: action.payload
            }
        },
        closeCardFormDepmodifierSlice: (state, action) => {
            return{
                ...state,
                addItem: false,
                action
            }
        },
        openCardFormDepmodifierSlice:(state,action) => {
            return{
                ...state,
                addItem: true,
                action
            }
        },
    }
})

export const { 
    getAllCardDepmodifierSlice, 
    closeCardFormDepmodifierSlice,
    openCardFormDepmodifierSlice,
 } = cardDepmodifier.actions;
export default cardDepmodifier.reducer