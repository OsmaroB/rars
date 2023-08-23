import { createSlice } from "@reduxjs/toolkit";

const paymentMethod = createSlice({
    name: 'payment-methods',
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
            userCreate:'',
            userUpdate:'',
        },
        addItem: false
    },
    reducers:{
        getPaymentMethodSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
        addPaymentMethodSlice: (state, action) => {
            const newList = action.payload.paymentMethods;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updatePaymentMethodSlice: (state, action) => {
            const paymentMethodID = action.payload.paymentMethod.id;
            const newList = (action.payload.paymentMethods).filter(item => item.id !== paymentMethodID);
            newList.push(action.payload.paymentMethod);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removePaymentMethodSlice: (state, action) => {
            const paymentMethodID = action.payload.paymentMethod.id;
            const newList = (action.payload.paymentMethods).filter(item => item.id !== paymentMethodID);
            newList.push(action.payload.paymentMethod);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormPaymentMethodSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormPaymentMethodSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchPaymentMethodSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.paymentMethods).filter(function(element){
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
    getPaymentMethodSlice,
    openFormPaymentMethodSlice,
    closeFormPaymentMethodSlice,
    addPaymentMethodSlice,
    updatePaymentMethodSlice,
    removePaymentMethodSlice,
    searchPaymentMethodSlice,
 } = paymentMethod.actions;
export default paymentMethod.reducer