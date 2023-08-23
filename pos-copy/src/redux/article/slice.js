import { createSlice } from "@reduxjs/toolkit";

const article = createSlice({
    name: 'article',
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
            purchasing_unit:'',
            quantity_purchasing_unit:'',
            sales_unit:'',
            quantity_sales_unit:'',
            stock:0,
            status:0,
            userCreate:'',
            userUpdate:'',
        },
        addItem: false
    },
    reducers:{
        getArticleSlice: (state, action) => {
            try {
                return {
                    ...state,
                    allItems: action.payload,
                    Items: action.payload,
                }
            } catch (error) {
                return error;
            }
        },
        addArticleSlice: (state, action) => {
            const newList = action.payload.articles;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateArticleSlice: (state, action) => {
            const articleID = action.payload.article.id;
            const newList = (action.payload.articles).filter(item => item.id !== articleID);
            newList.push(action.payload.article);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeArticleSlice: (state, action) => {
            const articleID = action.payload.article.id;
            const newList = (action.payload.articles).filter(item => item.id !== articleID);
            newList.push(action.payload.article);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormArticleSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormArticleSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchArticleSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.articles).filter(function(element){
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
    getArticleSlice, 
    openFormArticleSlice,
    closeFormArticleSlice,
    addArticleSlice,
    searchArticleSlice,
    updateArticleSlice,
    removeArticleSlice,
 } = article.actions;
export default article.reducer