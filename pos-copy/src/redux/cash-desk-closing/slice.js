import { createSlice } from '@reduxjs/toolkit';

const cashdeskclosing = createSlice({
  name: 'cashdesk',
  initialState: {
    allItems: [],
    Items: null,
    error: '',
    filter: null,
    searchKeyword: '',
    loading: false,
    newItem: {
      id: '',
      cash: '',
      date: '',
      hour: '',
      type: '',
      status: '',
      prettyCash: '',
      cashRegister: '',
    },
    addItem: false,
  },
  reducers: {
    getCashDeskClosingSlice: (state, action) => {
      return {
        ...state,
        allItems: action.payload,
        Items: action.payload,
      };
    },
    addCashDeskClosingSlice: (state, action) => {
      const newList = action.payload.cashdesk;
      return {
        ...state,
        allItems: newList,
        Items: newList,
      };
    },
    startCashDeskClosingSlice: (state, action) => {
      const newList = action.payload.cashdesk;
      return {
        ...state,
        allItems: newList,
        Items: newList,
      };
    },
    updateCashDeskClosingSlice: (state, action) => {
      const cashdeskID = action.payload.cashdesks.id;
      const newList = action.payload.cashdesks.filter(
        (item) => item.id !== cashdeskID
      );
      newList.push(action.payload.cashdesks);
      return {
        ...state,
        allItems: newList,
        Items: newList,
      };
    },
    updatePrettyCashDeskClosingSlice: (state, action) => {
      const newList = action.payload.cashdesk;
      return {
        ...state,
        allItems: newList,
        Items: newList,
      };
    },
    removeCashDeskClosingSlice: (state, action) => {
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
  getCashDeskClosingSlice,
  addCashDeskClosingSlice,
  removeCashDeskClosingSlice,
  updateCashDeskClosingSlice,
  startCashDeskClosingSlice,
  updatePrettyCashDeskClosingSlice,
} = cashdeskclosing.actions;
export default cashdeskclosing.reducer;
