import { createSlice } from "@reduxjs/toolkit";

const employee = createSlice({
    name: 'employee',
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
            lastName:'',
            status:0,
            userCreate:1
        },
        addItem: false
    },
    reducers:{
        getEmployeeSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addEmployeeSlice: (state, action) => {
            const newList = action.payload.employees;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateEmployeeSlice: (state, action) => {
            const employeeID = action.payload.employee.id;
            const newList = (action.payload.employees).filter(item => item.id !== employeeID);
            newList.push(action.payload.employee);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeEmployeeSlice: (state, action) => {
            const employeeID = action.payload.employee.id;
            const newList = (action.payload.employees).filter(item => item.id !== employeeID);
            newList.push(action.payload.employee);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormEmployeeSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormEmployeeSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchEmployeeSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.employees).filter(function(element){
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
    getEmployeeSlice, 
    openFormEmployeeSlice,
    closeFormEmployeeSlice,
    addEmployeeSlice,
    searchEmployeeSlice,
    updateEmployeeSlice,
    removeEmployeeSlice,
 } = employee.actions;
export default employee.reducer