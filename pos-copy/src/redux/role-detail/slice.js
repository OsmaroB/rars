import { createSlice } from "@reduxjs/toolkit";

const roleDetail = createSlice({
    name: 'roleDetail',
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
            url:'',
            description:'',
            status:0,
            userCreate:'',
            userUpdate:'',
            roleID:'',
            roleName:'',
        },
        addItem: false
    },
    reducers:{
        getRoleDetailSlice: (state, action) => {
            return {
                ...state,
                allItems: (action.payload).reverse(),
                Items: action.payload,
            }
        },
        addRoleDetailSlice: (state, action) => {
            const newList = action.payload.roleDetails;
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updateRoleDetailSlice: (state, action) => {
            const roleDetailID = action.payload.roleDetail.id;
            const newList = (action.payload.roleDetails).filter(item => item.id !== roleDetailID);
            newList.push(action.payload.roleDetail);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removeRoleDetailSlice: (state, action) => {
            const roleDetailID = action.payload.roleDetail.id;
            const newList = (action.payload.roleDetails).filter(item => item.id !== roleDetailID);
            newList.push(action.payload.roleDetail);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormRoleDetailSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormRoleDetailSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchRoleDetailSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.roleDetails).filter(function(element){
                return (element.url.toLowerCase()).indexOf(filter) !== -1;
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
    getRoleDetailSlice, 
    openFormRoleDetailSlice,
    closeFormRoleDetailSlice,
    addRoleDetailSlice,
    searchRoleDetailSlice,
    updateRoleDetailSlice,
    removeRoleDetailSlice,
 } = roleDetail.actions;
export default roleDetail.reducer