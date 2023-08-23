import { createSlice } from "@reduxjs/toolkit";

const giftcards = createSlice({
    name: 'giftcards',
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
            totalBalance: 0.00,
            currentBalance: 0.00,
            customerID: '',
            customerName: '',
            restaurantID: '',
            restaurantName: '',
            status: true,
        },
        addItem: false
    },
    reducers:{
        getGiftcardSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
        addGiftcardSlice: (state, action) => {
            const newList = action.payload.giftcards;
            newList.push(action.payload.giftcard);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateGiftcardSlice: (state, action) => {
            const giftcardID = action.payload.giftcard.id;
            const newList = (action.payload.giftcards).filter(item => item.id !== giftcardID);
            newList.push(action.payload.giftcard);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeGiftcardSlice: (state, action) => {
            const giftcardID = action.payload.giftcard.id;
            const newList = (action.payload.giftcards).filter(item => item.id !== giftcardID);
            newList.push(action.payload.giftcard);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormGiftcardSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormGiftcardSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchGiftcardSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.giftcards).filter(function(element){
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
    getGiftcardSlice, 
    addGiftcardSlice,
    updateGiftcardSlice,
    openFormGiftcardSlice,
    closeFormGiftcardSlice,
    removeGiftcardSlice,
    searchGiftcardSlice,
 } = giftcards.actions;
export default giftcards.reducer