import { createSlice } from "@reduxjs/toolkit";

const recipes = createSlice({
    name: 'recipes',
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
            userUpdate:'',
            userCreate:''
        },
        addItem: false
    },
    reducers:{
        getRecipeSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addRecipeSlice: (state, action) => {
            const newList = action.payload.recipes;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateRecipeSlice: (state, action) => {
            const recipeID = action.payload.recipe.id;
            const newList = (action.payload.recipes).filter(item => item.id !== recipeID);
            newList.push(action.payload.recipe);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeRecipeSlice: (state, action) => {
            const recipeID = action.payload.recipe.id;
            const newList = (action.payload.recipes).filter(item => item.id !== recipeID);
            newList.push(action.payload.recipe);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormRecipeSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormRecipeSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchRecipeSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.recipes).filter(function(element){
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
    getRecipeSlice, 
    addRecipeSlice,
    updateRecipeSlice,
    openFormRecipeSlice,
    closeFormRecipeSlice,
    removeRecipeSlice,
    searchRecipeSlice,
 } = recipes.actions;
export default recipes.reducer