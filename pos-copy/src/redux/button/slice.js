import { createSlice } from "@reduxjs/toolkit";

const buttons = createSlice({
    name: 'buttons',
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
            position:'',
            status: 0,
            userUpdate:'',
            userCreate:''
        },
        addItem: false
    },
    reducers:{
        getButtonSlice: (state, action) => {
            try {
                return {
                    ...state,
                    allItems: (action.payload).reverse(),
                    Items: action.payload,
                }
            } catch (error) {
                return error;
            }
        },
        addButtonSlice: (state, action) => {
            const newList = action.payload.buttons;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateButtonSlice: (state, action) => {
            const buttonID = action.payload.button.id;
            const newList = (action.payload.buttons).filter(item => item.id !== buttonID);
            newList.push(action.payload.button);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeButtonSlice: (state, action) => {
            const buttonID = action.payload.button.id;
            const newList = (action.payload.buttons).filter(item => item.id !== buttonID);
            newList.push(action.payload.button);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormButtonSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormButtonSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchButtonSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.buttons).filter(function(element){
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
    getButtonSlice, 
    addButtonSlice,
    updateButtonSlice,
    openFormButtonSlice,
    closeFormButtonSlice,
    removeButtonSlice,
    searchButtonSlice,
 } = buttons.actions;
export default buttons.reducer