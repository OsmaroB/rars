import { createSlice } from "@reduxjs/toolkit";

const documents = createSlice({
    name: 'documents',
    initialState:{
        allItems: [],
        allItemsDoc:[],
        Items: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem:{
            id:'',
            mask:'',
            startCorrelative:'',
            finishCorrelative:'',
            actualCorrelative:'',
            documentTypeID:'',
            documentTypeName:'',
            documentType:{
                name:'',
                id:''
            },
            status:0,
            userCreate:'',
            userUpdate:'',
        },
        addItem: false
    },
    reducers:{
        getAllSlice:(state,action)=>{
            return{
                ...state,
                action
            }
        },
        getDocumentSlice: (state, action) => {
            try {
                return {
                    ...state,
                    allItems: action.payload,
                    Items: action.payload,
                    // allItemsDoc:action.payload,
                    action
                }
            } catch (error) {
                console.log(error);
            }
        },
        addDocumentSlice: (state, action) => {
            const newList = action.payload.document;
            return{
                ...state,
                allItems: newList,
                Items: newList,
                allItemsDoc:[],
            }
        },
        getDocumentForDocIDSlice:(state,action)=>{
            return{
                ...state,
                allItemsDoc:action.payload.documents
            }
        },
        updateDocumentSlice: (state, action) => {
            const documentID = action.payload.document.id;
            const newList = (action.payload.documents).filter(item => item.id !== documentID);
            newList.push(action.payload.document);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeDocumentSlice: (state, action) => {
            const documentID = action.payload.document.id;
            const newList = (action.payload.documents).filter(item => item.id !== documentID);
            newList.push(action.payload.document);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormDocumentSlice: (state, action) => {
            return{
                ...state,
                addItem:true,
                action
            }
        },
        closeFormDocumentSlice:(state,action)=>{
            return{
                ...state,
                addItem:false,
                action
            }
        },
        searchDocumentSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.documents).filter(function(element){
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
    getDocumentSlice, 
    openFormDocumentSlice,
    closeFormDocumentSlice,
    addDocumentSlice,
    searchDocumentSlice,
    updateDocumentSlice,
    removeDocumentSlice,
    getDocumentForDocIDSlice,
    getAllSlice
 } = documents.actions;
export default documents.reducer