import { createSlice } from "@reduxjs/toolkit";

const buttonDetail = createSlice({
    name: 'buttonDetail',
    initialState:{
        allItems: [],
        Items: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem:{
            id:'',
            status:0,
            userCreate:0,
            buttonID:0,
            buttonName:0,
            productID:0,
            productName:0,
            product:{
                name:'',
                id:''
            },
            button:{
                name:'',
                id:''
            }
        },
        addItem: false
    },
    reducers:{
        getButtonDetailSlice: (state, action) => {
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
        addButtonDetailSlice: (state, action) => {
            const newList = action.payload.buttonDetails;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateButtonDetailSlice: (state, action) => {
            const buttonDetailID = action.payload.buttonDetail.id;
            const newList = (action.payload.buttonDetails).filter(item => item.id !== buttonDetailID);
            newList.push(action.payload.buttonDetail);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeButtonDetailSlice: (state, action) => {
            const buttonDetailID = action.payload.buttonDetail.id;
            console.log(buttonDetailID);
            const newList = (action.payload.buttonDetails).filter(item => item.id !== buttonDetailID);
            newList.push(action.payload.buttonDetail);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormButtonDetailSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormButtonDetailSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchButtonDetailSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.buttonDetails).filter(function(element){
                return (element.button.name.toLowerCase()).indexOf(filter) !== -1;
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
    getButtonDetailSlice, 
    openFormButtonDetailSlice,
    closeFormButtonDetailSlice,
    addButtonDetailSlice,
    searchButtonDetailSlice,
    updateButtonDetailSlice,
    removeButtonDetailSlice,
 } = buttonDetail.actions;
export default buttonDetail.reducer