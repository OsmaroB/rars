import { createSlice } from "@reduxjs/toolkit";

const role = createSlice({
    name: 'role',
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
            userUpdate:''
        },
        addItem: false
    },
    reducers:{
        getRoleSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addRoleSlice: (state, action) => {
            const newList = action.payload.roles;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateRoleSlice: (state, action) => {
            const roleID = action.payload.role.id;
            const newList = (action.payload.roles).filter(item => item.id !== roleID);
            newList.push(action.payload.role);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeRoleSlice: (state, action) => {
            const roleID = action.payload.role.id;
            const newList = (action.payload.roles).filter(item => item.id !== roleID);
            newList.push(action.payload.role);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormRoleSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormRoleSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchRoleSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.roles).filter(function(element){
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
    getRoleSlice, 
    openFormRoleSlice,
    closeFormRoleSlice,
    addRoleSlice,
    searchRoleSlice,
    updateRoleSlice,
    removeRoleSlice,
 } = role.actions;
export default role.reducer