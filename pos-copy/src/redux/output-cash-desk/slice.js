import { createSlice } from '@reduxjs/toolkit';

const outputcashdesk = createSlice({
  name: 'outputscash',
  initialState: {
    allItems: [],
    Items: null,
    error: '',
    filter: null,
    searchKeyword: '',
    loading: false,
    newItem: {
      id: '',
      output: '',
      description: '',
      cashDeskClosingID: null,
      userID: null,
      status: 0,
    },
    addItem: false,
  },
  reducers: {
    getOutputCashDeskSlice: (state, action) => {
      return {
        ...state,
        allItems: action.payload,
        Items: action.payload,
      };
    },
    getOutputCashDeskForIdSlice: (state, action) => {
      return {
        ...state,
        allItems: action.payload,
        Items: action.payload,
      };
    },
    getOutputCashDeskForCutAndStatuSlice: (state, action) => {
      return {
        ...state,
        allItems: action.payload,
        Items: action.payload,
      };
    },
    addOutputCashDeskSlice: (state, action) => {
      const newList = action.payload.outputs;
      return {
        ...state,
        allItems: newList,
        Items: newList,
      };
    },
    updateOutputCashDeskSlice: (state, action) => {
      const outputcashdeskID = action.payload.outputscashdesk.id;
      const newList = action.payload.outputscashdesk.filter(
        (item) => item.id !== outputcashdeskID
      );
      newList.push(action.payload.outputscashdesk);
      return {
        ...state,
        allItems: newList,
        Items: newList,
      };
    },
    removeOutputCashDeskSlice: (state, action) => {
      const outputcashdeskID = action.payload.outputscashdesk.id;
      const newList = action.payload.outputscashdesk.filter(
        (item) => item.id !== outputcashdeskID
      );
      newList.push(action.payload.outputscashdesk);
      return {
        ...state,
        allItems: newList,
        Items: newList,
      };
    },
  },
});
export const {
  getOutputCashDeskSlice,
  getOutputCashDeskForIdSlice,
  addOutputCashDeskSlice,
  removeOutputCashDeskSlice,
  updateOutputCashDeskSlice,
  getOutputCashDeskForCutAndStatuSlice,
} = outputcashdesk.actions;
export default outputcashdesk.reducer;
