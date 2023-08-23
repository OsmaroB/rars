import { createSlice } from "@reduxjs/toolkit";

const channels = createSlice({
    name: 'channels',
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
            restaurant:'',
            isChannel:'',
            status: 0,
            userCreate:0
        },
        addItem: false
    },
    reducers:{
        getChannelSlice: (state, action) => {
            try {
                return {
                    ...state,
                    allItems: action.payload,
                    Items: action.payload,
                }
            } catch (error) {
                console.log(error);
            }
        },
        addChannelSlice: (state, action) => {
            const newList = action.payload.channels;
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        updateChannelSlice: (state, action) => {
            const channelID = action.payload.channel.id;
            const newList = (action.payload.channels).filter(item => item.id !== channelID);
            newList.push(action.payload.channel);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        removeChannelSlice: (state, action) => {
            const channelID = action.payload.channel.id;
            const newList = (action.payload.channels).filter(item => item.id !== channelID);
            newList.push(action.payload.channel);
            return{
                ...state,
                allItems: newList,
                Items: newList
            }
        },
        OpenFormChannelSlice: (state, action) => {
            console.log(action);
            return{...state,addItem:true}
        },
        closeFormChannelSlice:(state,action)=>{
            console.log(action);
            return{...state,addItem:false}
        },
        searchChannelSlice:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            const newList = (action.payload.channels).filter(function(element){
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
    getChannelSlice, 
    addChannelSlice,
    OpenFormChannelSlice,
    closeFormChannelSlice,
    updateChannelSlice,
    removeChannelSlice,
    searchChannelSlice
 } = channels.actions;
export default channels.reducer