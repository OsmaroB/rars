import { createSlice } from "@reduxjs/toolkit";

const sales = createSlice({
    name: 'sales',
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
            tiketNumber:'',
            cashRegisterNumber:'',
            restaurant:'',
            channel:'',
            paymentMethod:'',
            date:'',
            hour:'',
            totalWithoutTax:'',
            totalDiscount:'',
            totalWithDiscount:'',
            tax:'',
            totalWithTax:'',
            tip:'',
            cutX:'',
            documentID:'',
            userID:'',
            customerID:'',
            status:0,
            userCreate:'',
            userUpdate:'',
            userAproved:'',
            document:{
                correlative:'',
                docummentType:{
                    name: ''
                }
            }
        },
        addItem: false
    },
    reducers:{
        getSaleSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addSaleSlice: (state, action) => {
            const newList = action.payload.sales;
            return{
                ...state,
                allItems: (newList),
                Items: newList
            }
        },
        addCanceledSaleSlice:(state,action)=>{
            return{
                ...state,
                action
            }
        },
        updateSaleSlice: (state, action) => {
            const saleID = action.payload.sale.id;
            const newList = (action.payload.sales).filter(item => item.id !== saleID);
            newList.push(action.payload.sale);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeSaleSlice: (state, action) => {
            return{
                ...state,
                allItems: (action.payload.sales).reverse(),
                Items: action.payload.sales
            }
        },
        openFormSaleSlice: (state, action) => {
            return{
                ...state,addItem:true,
                action
            }
        },
        closeFormSaleSlice:(state,action)=>{
            return{
                ...state,addItem:false,
                action,
            }
        },
        searchSaleSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.sales).filter(function(element){
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
    getSaleSlice, 
    openFormSaleSlice,
    closeFormSaleSlice,
    addSaleSlice,
    searchSaleSlice,
    updateSaleSlice,
    removeSaleSlice,
    addCanceledSaleSlice,
 } = sales.actions;
export default sales.reducer