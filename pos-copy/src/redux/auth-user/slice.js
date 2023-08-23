import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
    name: 'auth',
    initialState:{
        allItems: [],
        error:'',
        loading: false,
        newItem:{
            userID:'',
            token:'',
            employeeName:'',
            roleID:'',
            roleDetail:[]
        },
    },
    reducers:{
        postAuthUserSlice: (state, action) => {
            const user = action.payload.authUser;
            if(user.token !=='' && user.token !== undefined){
                return{
                    ...state,
                    allItems: user,
                    Items: user,
                    error:''
                }    
            }
            return{
                ...state,
                error:user
            }
        },
        getAuthUserSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
        getErrorAuthUserSlice: (state, action) => {
            return {
                ...state,
                error: action.payload,
            }
        },
        setAuthUserSlice:(state,action)=>{
            console.log(action);
            return{
                ...state,
                token:action.payload.token
            }
        }
    }
})

export const { 
    postAuthUserSlice,
    getAuthUserSlice,
    getErrorAuthUserSlice,
    setAuthUserSlice
 } = auth.actions;
export default auth.reducer