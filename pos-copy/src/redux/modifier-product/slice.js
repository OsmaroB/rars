import { createSlice } from "@reduxjs/toolkit";

const modifierProducts = createSlice({
    name: 'modifierProducts',
    initialState:{
        allItems: [],
        Items: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem:{
            id:'',
            status: 0,
            userCreate: '',
            userUpdate: '',
            modifierID: '',
            modifierName: '',
            submodifierID: '',
            submodifierName: '',
            depmodifierID: '',
            depmodifierName: '',
            productID: '',
            productName: '',
            modifier: {
                name: ''
            },
            submodifier:{
                name: ''
            },
            depmodifier:{
                name:''
            },
            product: {
                name: ''
            }
        },
        addItem: false
    },
    reducers:{
        getModifierProductSlice: (state, action) => {
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
        addModifierProductSlice: (state, action) => {
            const newList = action.payload.modifierProducts;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateModifierProductSlice: (state, action) => {
            const modifierProductID = action.payload.modifierProduct.id;
            const newList = (action.payload.modifierProducts).filter(item => item.id !== modifierProductID);
            newList.push(action.payload.modifierProduct);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeModifierProductSlice: (state, action) => {
            return{
                ...state,
                allItems: (action.payload.modifierProduct).reverse(),
                Items: action.payload.modifierProduct
            }
        },
        openFormModifierProductSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormModifierProductSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchModifierProductSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.modifierProducts).filter(function(element){
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
    getModifierProductSlice, 
    addModifierProductSlice,
    updateModifierProductSlice,
    openFormModifierProductSlice,
    closeFormModifierProductSlice,
    removeModifierProductSlice,
    searchModifierProductSlice,
    getModifierProductForIdSlice
 } = modifierProducts.actions;
export default modifierProducts.reducer