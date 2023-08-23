import { createSlice } from '@reduxjs/toolkit';

const salesfordate = createSlice({
  name: 'salesfordate',
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
    payments: [],
    channels: [],
    addItem: false,
  },
  reducers: {
    getSalesfordatePaymentSlice: (state, action) => {
      console.log(action.payload);
      const nuevo = localStorage.getItem('payments')
        ? JSON.parse(localStorage.getItem('payments'))
        : [];
      nuevo.push(action.payload);
      localStorage.setItem('payments', JSON.stringify(nuevo));
      for (let i = 0; i < action.payload.length; i += 1) {
        state.payments.push({ ...action.payload[i] });
      }
    },
    getSalesfordateChannelSlice: (state, action) => {
      return {
        ...state,
        channels: action.payload,
      };
    },
  },
});
export const { getSalesfordateChannelSlice, getSalesfordatePaymentSlice } =
  salesfordate.actions;
export default salesfordate.reducer;
