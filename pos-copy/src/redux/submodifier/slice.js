import { createSlice } from "@reduxjs/toolkit";

const submodifiers = createSlice({
    name: 'submodifiers',
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
            modifierID: '',
            userCreate: '',
            userUpdate: '',
            modifier:{
                id: '',
                name: '',
            }
        },
        addItem: false
    },
    reducers:{
        getSubmodifierSlice: (state, action) => {
            try {
                return {
                    ...state,
                    allItems: action.payload,
                    Items: action.payload,
                }
            } catch (error) {
                return error;
            }
        },
        addSubmodifierSlice: (state, action) => {
            const newList = action.payload.submodifiers;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateSubmodifierSlice: (state, action) => {
            const submodifierID = action.payload.submodifier.id;
            const newList = (action.payload.submodifiers).filter(item => item.id !== submodifierID);
            newList.push(action.payload.submodifier);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeSubmodifierSlice: (state, action) => {
            const submodifierID = action.payload.submodifier.id;
            const newList = (action.payload.submodifiers).filter(item => item.id != submodifierID);
            newList.push(action.payload.submodifier);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormSubmodifierSlice: (state, action) => {
            return{
                ...state,
                addItem:true,
                action
            }
        },
        closeFormSubmodifierSlice:(state,action)=>{
            return{
                ...state,
                addItem:false,
                action
            }
        },
        searchSubmodifierSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.submodifiers).filter(function(element){
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
    getSubmodifierSlice, 
    addSubmodifierSlice,
    updateSubmodifierSlice,
    openFormSubmodifierSlice,
    closeFormSubmodifierSlice,
    removeSubmodifierSlice,
    searchSubmodifierSlice
 } = submodifiers.actions;
export default submodifiers.reducer