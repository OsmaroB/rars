import { createSlice } from "@reduxjs/toolkit";

const recipeArticle = createSlice({
    name: 'recipeArticle',
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
            articleID:'',
            articleName:'',
            recipe:{
                name:''
            },
            article:{
                name:''
            }
        },
        addItem: false
    },
    reducers:{
        getRecipeArticleSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addRecipeArticleSlice: (state, action) => {
            const newList = action.payload.recipeArticles;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateRecipeArticleSlice: (state, action) => {
            const recipeArticleID = action.payload.recipeArticle.id;
            const newList = (action.payload.recipeArticles).filter(item => item.id !== recipeArticleID);
            newList.push(action.payload.recipeArticle);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeRecipeArticleSlice: (state, action) => {
            const recipeArticleID = action.payload.recipeArticle.id;
            const newList = (action.payload.recipeArticles).filter(item => item.id !== recipeArticleID);
            newList.push(action.payload.recipeArticle);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormRecipeArticleSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormRecipeArticleSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchRecipeArticleSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.recipeArticles).filter(function(element){
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
    getRecipeArticleSlice, 
    addRecipeArticleSlice,
    updateRecipeArticleSlice,
    openFormRecipeArticleSlice,
    closeFormRecipeArticleSlice,
    removeRecipeArticleSlice,
    searchRecipeArticleSlice,
 } = recipeArticle.actions;
export default recipeArticle.reducer