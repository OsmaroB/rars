import { createSlice } from "@reduxjs/toolkit";

const tiketConfiguration = createSlice({
    name: 'tiketConfiguration',
    initialState:{
        allItems: [],
        Items: null,
        error: '',
        loading: false,
        newItem:{
            id:'',
            enterprise:'',
            nit:'',
            item:'',
            address:'',
            resolution:'',
            serie:'',
            authorizationDate:'',
            cashRegisterNumber:'',
            link:'',
            paragraph1:'',
            paragraph2:'',
            userCreate:'',
            userUpdate:''
        },
        addItem: false
    },
    reducers:{
        getTiketConfigurationSlice: (state, action) => {
            localStorage.setItem('tiket-configuration', JSON.stringify(action.payload));
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
        addTiketConfigurationSlice: (state, action) => {
            const newList = action.payload.configuration;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateTiketConfigurationSlice: (state, action) => {
            return{
                ...state,
                allItems: action.payload.configuration,
                Items: action.payload.configuration
            }
        },
        openFormTiketConfigurationSlice: (state, action) => {
            return{
                ...state,
                addItem:true,
                action,
            }
        },
        closeFormTiketConfigurationSlice:(state,action)=>{
            
            return{
                ...state,
                addItem:false,
                action
            }
        },
    }
})

export const { 
    getTiketConfigurationSlice, 
    openFormTiketConfigurationSlice,
    closeFormTiketConfigurationSlice,
    addTiketConfigurationSlice,
    updateTiketConfigurationSlice,
 } = tiketConfiguration.actions;
export default tiketConfiguration.reducer