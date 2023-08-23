import { createSlice } from "@reduxjs/toolkit";

const paymentMethodDetails = createSlice({
    name: 'payment-method-details',
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
            description:'',
            paymentMethodID: '',
            paymentMethodName: '',
            status: 0,
            paymentMethod:{
                name:'',
                id:''
            }
        },
        addItem: false
    },
    reducers:{
        getPaymentMethodDetailSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
        addPaymentMethodDetailSlice: (state, action) => {
            const newList = action.payload.paymentMethodDetails;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updatePaymentMethodDetailSlice: (state, action) => {
            const paymentMethodDetailID = action.payload.paymentMethodDetail.id;
            const newList = (action.payload.paymentMethodDetails).filter(item => item.id !== paymentMethodDetailID);
            newList.push(action.payload.paymentMethodDetail);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removePaymentMethodDetailSlice: (state, action) => {
            const paymentMethodDetailID = action.payload.paymentMethodDetail.id;
            const newList = (action.payload.paymentMethodDetails).filter(item => item.id !== paymentMethodDetailID);
            newList.push(action.payload.paymentMethodDetail);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormPaymentMethodDetailSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormPaymentMethodDetailSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchPaymentMethodDetailSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.paymentMethodDetails).filter(function(element){
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
    getPaymentMethodDetailSlice, 
    addPaymentMethodDetailSlice,
    updatePaymentMethodDetailSlice,
    openFormPaymentMethodDetailSlice,
    closeFormPaymentMethodDetailSlice,
    removePaymentMethodDetailSlice,
    searchPaymentMethodDetailSlice
 } = paymentMethodDetails.actions;
export default paymentMethodDetails.reducer