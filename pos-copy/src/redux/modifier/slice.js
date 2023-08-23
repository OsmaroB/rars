import { createSlice } from "@reduxjs/toolkit";

const modifiers = createSlice({
    name: 'modifiers',
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
        getModifierSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addModifierSlice: (state, action) => {
            const newList = action.payload.modifiers;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateModifierSlice: (state, action) => {
            const modifierID = action.payload.modifier.id;
            const newList = (action.payload.modifiers).filter(item => item.id !== modifierID);
            newList.push(action.payload.modifier);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeModifierSlice: (state, action) => {
            const modifierID = action.payload.modifier.id;
            const newList = (action.payload.modifiers).filter(item => item.id !== modifierID);
            newList.push(action.payload.modifier);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormModifierSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormModifierSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchModifierSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.modifiers).filter(function(element){
                return (element.name.toLowerCase()).indexOf(filter) !== -1;
            });
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            } 
        }
    }
})

export const { 
    getModifierSlice, 
    addModifierSlice,
    updateModifierSlice,
    openFormModifierSlice,
    closeFormModifierSlice,
    removeModifierSlice,
    searchModifierSlice
 } = modifiers.actions;
export default modifiers.reducer