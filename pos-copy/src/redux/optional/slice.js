import { createSlice } from "@reduxjs/toolkit";

const optionals = createSlice({
    name: 'optionals',
    initialState:{
        allItems: [],
        Items: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem:{
            id:'',
            mask:'',
            name:'',
            status: 0,
            userCreate: '',
            userUpdate: '',
        },
        addItem: false
    },
    reducers:{
        getOptionalSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
        addOptionalSlice: (state, action) => {
            const newList = action.payload.optionals;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateOptionalSlice: (state, action) => {
            const optionalID = action.payload.optional.id;
            const newList = (action.payload.optionals).filter(item => item.id !== optionalID);
            newList.push(action.payload.optional);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeOptionalSlice: (state, action) => {
            const optionalID = action.payload.optional.id;
            const newList = (action.payload.optionals).filter(item => item.id !== optionalID);
            newList.push(action.payload.optional);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormOptionalSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormOptionalSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchOptionalSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.optionals).filter(function(element){
                return (element.name.toLowerCase()).indexOf(filter) !== -1;
            });
            return{
                ...state,
                allItems: newList,
                Items: newList
            } 
        }
    }
})

export const { 
    getOptionalSlice, 
    addOptionalSlice,
    updateOptionalSlice,
    openFormOptionalSlice,
    closeFormOptionalSlice,
    removeOptionalSlice,
    searchOptionalSlice
 } = optionals.actions;
export default optionals.reducer