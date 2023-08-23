import { createSlice } from "@reduxjs/toolkit";

const restaurants = createSlice({
    name: 'restaurants',
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
            address: '',
            brandName: '',
            brandID: '',
            status: true,
        },
        addItem: false
    },
    reducers:{
        getRestaurantSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },
        addRestaurantSlice: (state, action) => {
            const newList = action.payload.restaurants;
            newList.push(action.payload.restaurant);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateRestaurantSlice: (state, action) => {
            const restaurantID = action.payload.restaurant.id;
            const newList = (action.payload.restaurants).filter(item => item.id !== restaurantID);
            newList.push(action.payload.restaurant);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeRestaurantSlice: (state, action) => {
            const restaurantID = action.payload.restaurant.id;
            const newList = (action.payload.restaurants).filter(item => item.id !== restaurantID);
            newList.push(action.payload.restaurant);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormRestaurantSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormRestaurantSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchRestaurantSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.restaurants).filter(function(element){
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
    getRestaurantSlice, 
    addRestaurantSlice,
    updateRestaurantSlice,
    openFormRestaurantSlice,
    closeFormRestaurantSlice,
    removeRestaurantSlice,
    searchRestaurantSlice,
 } = restaurants.actions;
export default restaurants.reducer