import { createSlice } from "@reduxjs/toolkit";

const subcategories = createSlice({
    name: 'subcategories',
    initialState:{
        allItems: [],
        Items: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem:{
            id:'',
            name:'',
            categoryID: '',
            status: 0,
            categoryName: '',
            category:{
                name:'',
                id:''
            }
        },
        addItem: false
    },
    reducers:{
        getSubCategorySlice: (state, action) => {
            try {
                return {
                    ...state,
                    allItems: action.payload,
                    Items: action.payload,
                }
            } catch (error) {
                return (error)
            }
        },
        addSubCategorySlice: (state, action) => {
            const newList = action.payload.subcategories;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateSubCategorySlice: (state, action) => {
            const subcategoryID = action.payload.subcategory.id;
            const newList = (action.payload.subcategories).filter(item => item.id !== subcategoryID);
            newList.push(action.payload.subcategory);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeSubCategorySlice: (state, action) => {
            const subcategoryID = action.payload.subcategory.id;
            const newList = (action.payload.subcategories).filter(item => item.id !== subcategoryID);
            newList.push(action.payload.subcategory);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        OpenFormSubcategorySlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormSubCategorySlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchSubCategorySlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.subcategories).filter(function(element){
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
    getSubCategorySlice, 
    addSubCategorySlice,
    updateSubCategorySlice,
    OpenFormSubcategorySlice,
    closeFormSubCategorySlice,
    removeSubCategorySlice,
    searchSubCategorySlice
 } = subcategories.actions;
export default subcategories.reducer