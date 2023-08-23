import { createSlice } from "@reduxjs/toolkit";

const prices = createSlice({
    name: 'prices',
    initialState:{
        allItems: [],
        Items: null,
        error: '',
        filter: null,
        searchKeyword: '',
        loading: false,
        newItem:{
            id:'',
            price:0.00,
            status: 0,
            userUpdate:'',
            userCreate:'',
            buttonDetailID: null,
            buttonDetailName: '',
            channelID:null,
            channelName:'',
            subchannelID:null,
            subchannelName: '',
            optionalProductID:null,
            optionalProductName: '',
            modifierProductID: null,
            modifierProductName: '',
            modifier:{
                id: '',
                modifier:{
                    name: ''
                },
                product:{
                    name: '',
                }
            },
            buttonDetail:{
                id: '',
                button:{
                    name:''
                },
                product: {
                    name: ''
                }
            },
            channelsSubchannel:{
                id: '',
                name: ''
            },
            subchannel:{},
            optionalProduct:{},
            modifierProduct:{
                id:'',
                productID:null,
                modifierID:null,
                submodifierID:null,
                depmodifierID:null,
                modifier:{
                    name:''
                }
            }
        },
        addItem: false
    },
    reducers:{
        getPriceSlice: (state, action) => {
            try {
                // console.log(action.payload.prices);]
                return {
                    ...state,
                    allItems: (action.payload.prices).reverse(),
                    Items: action.payload.prices,
                }
            } catch (error) {
                return error;
            }
        },
        addPriceSlice: (state, action) => {
            const newList = action.payload.prices;
            console.log(newList);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        updatePriceSlice: (state, action) => {
            const priceID = action.payload.price.id;
            const newList = (action.payload.prices).filter(item => item.id !== priceID);
            newList.push(action.payload.price);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        removePriceSlice: (state, action) => {
            const priceID = action.payload.price.id;
            const newList = (action.payload.prices).filter(item => item.id !== priceID);
            newList.push(action.payload.price);
            return{
                ...state,
                allItems: (newList).reverse(),
                Items: newList
            }
        },
        openFormPriceSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormPriceSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchPriceSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newItem = (action.payload.prices).filter((item)=>{
                var productName = item.buttonDetailID != null ? item.buttonDetail.product.name : '';
                var price = item.price;
                var channelName = item.channelID != null ? item.channelsSubchannel.name : '';
                var subchannelName = item.subchannelID != null ? item.subchannel.name : '';
                const filterComparation = `${productName.toLowerCase()}${price}${channelName.toLowerCase()}${subchannelName.toLowerCase()}` 
                console.log(filterComparation);
                return(filterComparation.indexOf(filter) !== -1)
            })
            return{
                ...state,
                allItems: (newItem).reverse(),
                Items: newItem
            } 
        }
    }
})

export const { 
    getPriceSlice, 
    addPriceSlice,
    updatePriceSlice,
    openFormPriceSlice,
    closeFormPriceSlice,
    removePriceSlice,
    searchPriceSlice,
 } = prices.actions;
export default prices.reducer