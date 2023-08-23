import { createSlice } from "@reduxjs/toolkit";

const documentType = createSlice({
    name: 'documentType',
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
            description:'',
            status:0,
            userCreate:1
        },
        addItem: false
    },
    reducers:{
        getDocumentTypeSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
        addDocumentTypeSlice: (state, action) => {
            const newList = action.payload.documentTypes;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateDocumentTypeSlice: (state, action) => {
            const documentTypeID = action.payload.documentType.id;
            const newList = (action.payload.documentTypes).filter(item => item.id !== documentTypeID);
            newList.push(action.payload.documentType);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeDocumentTypeSlice: (state, action) => {
            const documentTypeID = action.payload.documentType.id;
            const newList = (action.payload.documentTypes).filter(item => item.id !== documentTypeID);
            newList.push(action.payload.documentType);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormDocumentTypeSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormDocumentTypeSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchDocumentTypeSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.documentTypes).filter(function(element){
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
    getDocumentTypeSlice, 
    openFormDocumentTypeSlice,
    closeFormDocumentTypeSlice,
    addDocumentTypeSlice,
    searchDocumentTypeSlice,
    updateDocumentTypeSlice,
    removeDocumentTypeSlice,
 } = documentType.actions;
export default documentType.reducer