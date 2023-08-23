import { createSlice } from "@reduxjs/toolkit";

const productDetail = createSlice({
    name: 'productDetail',
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
            status: 0,
            userUpdate:'',
            userCreate:'',
            recipeID:'',
            recipeName:'',
            productID:'',
            productName:'',
            recipe:{
                name:''
            },
            product:{
                name:''
            }
        },
        addItem: false
    },
    reducers:{
        getProductDetailSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addProductDetailSlice: (state, action) => {
            const newList = action.payload.productDetails;
            console.log(newList);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateProductDetailSlice: (state, action) => {
            const productDetailID = action.payload.productDetail.id;
            const newList = (action.payload.productDetails).filter(item => item.id !== productDetailID);
            newList.push(action.payload.productDetail);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeProductDetailSlice: (state, action) => {
            const productDetailID = action.payload.productDetail.id;
            const newList = (action.payload.productDetails).filter(item => item.id !== productDetailID);
            newList.push(action.payload.productDetail);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormProductDetailSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormProductDetailSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchProductDetailSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.productDetails).filter(function(element){
                return (element.recipe.name.toLowerCase()).indexOf(filter) !== -1;
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
    getProductDetailSlice, 
    addProductDetailSlice,
    updateProductDetailSlice,
    openFormProductDetailSlice,
    closeFormProductDetailSlice,
    removeProductDetailSlice,
    searchProductDetailSlice,
 } = productDetail.actions;
export default productDetail.reducer