import { createSlice } from "@reduxjs/toolkit";

const customers = createSlice({
    name: 'customers',
    initialState:{
        allItems: [],
        Items: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem:{
            id:'',
            dui:'',
            name:'',
            lastName:'',
            email: '',
            status: true,
        },
        customerSelected:{
            id:'',
            name:'',
        },
        addItem: false
    },
    reducers:{
        getAllCustomerSlice:(state,action)=>{
            return{
                ...state,
                action
            }
        },
        setCustomerSlice:(state,action)=>{
            const customer = action.payload.customer;
            return{
                ...state,
                customerSelected: {
                    id:customer.id,
                    name:customer.name,
                }
            }
        },
        getCustomerSlice: (state, action) => {
            try {
                return {
                    ...state,
                    allItems: (action.payload).reverse(),
                    Items: action.payload,
                }
            } catch (error) {
                return error;
            }
        },
        addCustomerSlice: (state, action) => {
            const newList = action.payload.customers;
            const customer = action.payload.customer
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList,
                addItem:false,
                customerSelected:{
                    id:customer.id,
                    name:customer.name,
                }
            }
        },
        updateCustomerSlice: (state, action) => {
            const customerID = action.payload.customer.id;
            const newList = (action.payload.customers).filter(item => item.id !== customerID);
            newList.push(action.payload.customer);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeCustomerSlice: (state, action) => {
            const customerID = action.payload.customer.id;
            const newList = (action.payload.customers).filter(item => item.id !== customerID);
            newList.push(action.payload.customer);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormCustomerSlice: (state, action) => {
            return{
                ...state,
                addItem:true,
                action
            }
        },
        closeFormCustomerSlice:(state,action)=>{
            return{
                ...state,
                addItem:false,
                action
            }
        },
        searchCustomerSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.customers).filter(function(element){
                const dataFilter = element.name.toLowerCase()+element.dui.toLowerCase()+element.lastName.toLowerCase()+element.email.toLowerCase(); 
                return (dataFilter).indexOf(filter) !== -1;
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
    getCustomerSlice, 
    addCustomerSlice,
    updateCustomerSlice,
    openFormCustomerSlice,
    closeFormCustomerSlice,
    removeCustomerSlice,
    searchCustomerSlice,
    getAllCustomerSlice,
    setCustomerSlice
 } = customers.actions;
export default customers.reducer