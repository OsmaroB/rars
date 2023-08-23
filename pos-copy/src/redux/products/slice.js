import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
    name: 'product',
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
            nickname:'',
            status: 0,
            userUpdate:'',
            userCreate:'',
        },
        addItem: false
    },
    reducers:{
        getProductSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addProductSlice: (state, action) => {
            const newList = action.payload.products;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateProductSlice: (state, action) => {
            const productID = action.payload.product.id;
            const newList = (action.payload.products).filter(item => item.id !== productID);
            newList.push(action.payload.product);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeProductSlice: (state, action) => {
            const productID = action.payload.product.id;
            const newList = (action.payload.products).filter(item => item.id !== productID);
            newList.push(action.payload.product);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormProductSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormProductSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchProductSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.products).filter(function(element){
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
    getProductSlice, 
    addProductSlice,
    updateProductSlice,
    openFormProductSlice,
    closeFormProductSlice,
    removeProductSlice,
    searchProductSlice,
 } = product.actions;
export default product.reducer