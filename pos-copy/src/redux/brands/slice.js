import { createSlice } from "@reduxjs/toolkit";

const brands = createSlice({
    name: 'brands',
    initialState:{
        allItems: [],
        Items: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem:{
            id:'',
            name:'',
            status: true,
        },
        addItem: false
    },
    reducers:{
        getBrandSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
    }
})

export const { 
    getBrandSlice, 
 } = brands.actions;
export default brands.reducer