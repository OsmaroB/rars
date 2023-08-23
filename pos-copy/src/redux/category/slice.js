import { createSlice } from '@reduxjs/toolkit';

const categories = createSlice({
    name: 'categories',
    initialState: {
        allCategoriesItems: [],
        categoriesItems: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem: {
        id: '',
        mask: '',
        name: '',
        position:'',
        status: 0,
        userCreate: '',
        userUpdate: '',
        },
    },
    reducers:{
        
        getCategorySlice: (state, action) => {
            try {
                return {
                    ...state,
                    payload: action.payload,
                    allCategoriesItems: action.payload
                }
            } catch (error) {
                return error;
            }
        },
        updateCategorySlice: (state, action) => {
            const categoryID = action.payload.category.id;
            const res = (action.payload.categories).filter(item => item.id !== categoryID);
            res.push(action.payload.category);
            return{
                ...state,
                payload: res,
                allCategoriesItems: res
            }
        },
        addCategorySlice: (state, action) => {
            const newList = action.payload.categories;
            return{
                ...state,
                payload: newList,
                allCategoriesItems: newList
            }
        },
        removeCategorySlice: (state, action) => {
            const categoryID = action.payload.category.id;
            const res = (action.payload.categories).filter(item => item.id !== categoryID);
            res.push(action.payload.category);
            console.log(res);
            return{
                ...state,
                payload: res,
                allCategoriesItems: res
            }
        },
        addBoolSlice: (state, action) => {
            return{
                ...state,
                payload: action.payload.category.payload,
                allCategoriesItems: action.payload.category.payload,
                addItem:true,
                newItem: action.payload.category.newItem
            }
        },
        closeFormCategorySlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchCategorySlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.categories).filter(function(element){
                return (element.name.toLowerCase()).indexOf(filter) !== -1;
            });
            return{
                ...state,
                payload: newList,
                allCategoriesItems: newList,
            } 
        },
    }
})

export const {
  getCategorySlice,
  updateCategorySlice,
  addCategorySlice,
  addBoolSlice,
  closeFormCategorySlice,
  removeCategorySlice,
  searchCategorySlice,
} = categories.actions;
export default categories.reducer;
