import { createSlice } from "@reduxjs/toolkit";

const categoryButton = createSlice({
    name: 'categoryButton',
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
            userUpdate:'',
            userCreate:'',
            buttonID:'',
            buttonName:'',
            categoryID:'',
            categoryName:'',
            days:'',
            untilDate:'',
            specificDate:'',
            button:{
                name:''
            },
            category:{
                name:''
            }
        },
        addItem: false
    },
    reducers:{
        getCategoryButtonSlice: (state, action) => {
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
        addCategoryButtonSlice: (state, action) => {
            const newList = action.payload.categoryButtons;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateCategoryButtonSlice: (state, action) => {
            const categoryButtonID = action.payload.categoryButton.id;
            const newList = (action.payload.categoryButtons).filter(item => item.id !== categoryButtonID);
            newList.push(action.payload.categoryButton);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeCategoryButtonSlice: (state, action) => {
            const categoryButtonID = action.payload.categoryButton.id;
            const newList = (action.payload.categoryButtons).filter(item => item.id !== categoryButtonID);
            newList.push(action.payload.categoryButton);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormCategoryButtonSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormCategoryButtonSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchCategoryButtonSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.categoryButtons).filter(function(element){
                return (element.category.name.toLowerCase()).indexOf(filter) !== -1;
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
    getCategoryButtonSlice, 
    addCategoryButtonSlice,
    updateCategoryButtonSlice,
    openFormCategoryButtonSlice,
    closeFormCategoryButtonSlice,
    removeCategoryButtonSlice,
    searchCategoryButtonSlice,
 } = categoryButton.actions;
export default categoryButton.reducer