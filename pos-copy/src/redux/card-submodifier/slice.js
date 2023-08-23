import { createSlice } from "@reduxjs/toolkit";

const cardSubmodifier = createSlice({
    name: 'cardSubmodifier',
    initialState:{
        addItem: false,
        modifierSelectedID: '',
        addProduct: false,
    },
    reducers:{
        getAllCardSubmodifierSlice: (state, action) => {
            console.log(action);
            return {
                ...state,
                payload: action.payload,
                addItem: action.payload,
                modifierSelectedID: action.payload
            }
        },
        closeCardFormSubmodifierSlice: (state, action) => {
            return{
                ...state,
                addItem: false,
                action
            }
        },
        openCardFormSubmodifierSlice:(state,action) => {
            return{
                ...state,
                addItem: true,
                action
            }
        },
        setModifierSelectedCSIdSlice:(state,action) => {
            return{
                ...state,
                modifierSelectedID: action.payload,
            }
        },
        statusProductCardSubmodifierSlice:(state, action) => {
            return{
                ...state,
                addProduct: action.payload.statusProduct
            }
        },
    }
})

export const { 
    getAllCardSubmodifierSlice, 
    closeCardFormSubmodifierSlice,
    openCardFormSubmodifierSlice,
    setModifierSelectedCSIdSlice,
    statusProductCardSubmodifierSlice
 } = cardSubmodifier.actions;
export default cardSubmodifier.reducer