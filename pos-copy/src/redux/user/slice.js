import { createSlice } from "@reduxjs/toolkit";
import {successMessage} from "helpers/messages";

const users = createSlice({
    name: 'users',
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
            email: '',
            password: '',
            status: 0,
            userCreate: '',
            userUpdate: '',
            employeeName:'',
            employeeID: '',
            roleName:'',
            roleID: '',
        },
        addItem: false
    },
    reducers:{
        getUserSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addUserSlice: (state, action) => {
            const newList = action.payload.users;
            successMessage(
                'Envio de datos exitoso',
                'El item a sido guardado con exito'
            );
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateUserSlice: (state, action) => {
            const userID = action.payload.user.id;
            const newList = (action.payload.users).filter(item => item.id !== userID);
            newList.push(action.payload.user);
            successMessage(
                'Envio de datos exitoso',
                'El item a sido actualizado con exito'
            );
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeUserSlice: (state, action) => {
            const userID = action.payload.user.id;
            const newList = (action.payload.users).filter(item => item.id !== userID);
            newList.push(action.payload.user);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormUserSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormUserSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        closeFormCodeSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchUserSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.users).filter(function(element){
                return (element.email.toLowerCase()).indexOf(filter) !== -1;
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
    getUserSlice, 
    addUserSlice,
    updateUserSlice,
    openFormUserSlice,
    closeFormUserSlice,
    closeFormCodeSlice,
    removeUserSlice,
    searchUserSlice
 } = users.actions;
export default users.reducer