import { createSlice } from "@reduxjs/toolkit";

const subchannels = createSlice({
    name: 'subchannels',
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
            status: 0,
            channelID: '',
            channelName: '',
            channelsSubchannel:{
                name:'',
                id:''
            }
        },
        addItem: false
    },
    reducers:{
        getSubChannelSlice: (state, action) => {
            try {
                return {
                    ...state,
                    allItems: action.payload,
                    Items: action.payload,
                }
            } catch (error) {
                return error;
            }
        },
        addSubChannelSlice: (state, action) => {
            const newList = action.payload.subchannels;
            newList.push(action.payload.subchannel);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateSubChannelSlice: (state, action) => {
            const subchannelID = action.payload.subchannel.id;
            const newList = (action.payload.subchannels).filter(item => item.id !== subchannelID);
            newList.push(action.payload.subchannel);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeSubChannelSlice: (state, action) => {
            const subchannelID = action.payload.subchannel.id;
            const newList = (action.payload.subchannels).filter(item => item.id !== subchannelID);
            newList.push(action.payload.subchannel);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        openFormSubChannelSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormSubChannelSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchSubChannelSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.subchannels).filter(function(element){
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
    getSubChannelSlice, 
    addSubChannelSlice,
    closeFormSubChannelSlice,
    openFormSubChannelSlice,
    updateSubChannelSlice,
    removeSubChannelSlice,
    searchSubChannelSlice
 } = subchannels.actions;
export default subchannels.reducer