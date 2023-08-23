import { createSlice } from "@reduxjs/toolkit";

const prints = createSlice({
    name: 'prints',
    initialState:{
        printStatus:false,

    },
    reducers:{
        getAllPrintsSlice:(state,action)=>{
            return{
                ...state,
                action
            }
        },
        printCanceledSaleSlice: (state, action) => {
            return {
                ...state,
                printStatus:action.payload.res
            }
        }
    }
})

export const { 
    getAllPrintsSlice, 
    printCanceledSaleSlice
 } = prints.actions;
export default prints.reducer