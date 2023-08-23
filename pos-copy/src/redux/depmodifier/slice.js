import { createSlice } from '@reduxjs/toolkit';

const depmodifiers = createSlice({
    name: 'depmodifiers',
    initialState: {
        allItems: [],
        Items: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem: {
            id: '',
            mask: '',
            name: '',
            status: 0,
            submodifierID: '',
            userCreate: '',
            userUpdate: '',
            submodifier: {
                id: '',
                name: '',
            },
        },
    },
    reducers:{
        getDepmodifierSlice: (state, action) => {
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
        addDepmodifierSlice: (state, action) => {
            const newList = action.payload.submodifiers;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateDepmodifierSlice: (state, action) => {
            const depmodifierID = action.payload.depmodifier.id;
            const newList = (action.payload.depmodifiers).filter(item => item.id !== depmodifierID);
            newList.push(action.payload.depmodifier);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeDepmodifierSlice: (state, action) => {
            const depmodifierID = action.payload.depmodifier.id;
            const newList = (action.payload.depmodifiers).filter(item => item.id !== depmodifierID);
            newList.push(action.payload.depmodifier);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormDepmodifierSlice: (state, action) => {
            return{
                ...state,
                addItem:true,
                action
            }
        },
        closeFormDepmodifierSlice:(state,action)=>{
            return{
                ...state,
                addItem:false,
                action
            }
        },
        searchDepmodifierSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.depmodifiers).filter(function(element){
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
  getDepmodifierSlice,
  addDepmodifierSlice,
  updateDepmodifierSlice,
  openFormDepmodifierSlice,
  closeFormDepmodifierSlice,
  removeDepmodifierSlice,
  searchDepmodifierSlice,
} = depmodifiers.actions;
export default depmodifiers.reducer;
