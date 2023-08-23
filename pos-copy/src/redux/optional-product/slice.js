import { createSlice } from "@reduxjs/toolkit";

const optionalProduct = createSlice({
    name: 'optionalProduct',
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
            productID:0,
            productName:0,
            optionalID:0,
            optionalName:0,
            optional:{
                name:'',
                id:''
            },
            product:{
                name:'',
                id:''
            }
        },
        addItem: false
    },
    reducers:{
        getOptionalProductSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
        addOptionalProductSlice: (state, action) => {
            const newList = action.payload.optionalProducts;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateOptionalProductSlice: (state, action) => {
            const optionalProductID = action.payload.optionalProduct.id;
            const newList = (action.payload.optionalProducts).filter(item => item.id !== optionalProductID);
            newList.push(action.payload.optionalProduct);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeOptionalProductSlice: (state, action) => {
            const optionalProductID = action.payload.optionalProduct.id;
            console.log(optionalProductID);
            const newList = (action.payload.optionalProducts).filter(item => item.id !== optionalProductID);
            newList.push(action.payload.optionalProduct);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormOptionalProductSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormOptionalProductSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchOptionalProductSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.optionalProducts).filter(function(element){
                return (element.product.name.toLowerCase()).indexOf(filter) !== -1;
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
    getOptionalProductSlice, 
    openFormOptionalProductSlice,
    closeFormOptionalProductSlice,
    addOptionalProductSlice,
    searchOptionalProductSlice,
    updateOptionalProductSlice,
    removeOptionalProductSlice,
 } = optionalProduct.actions;
export default optionalProduct.reducer