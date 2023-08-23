import { createSlice } from '@reduxjs/toolkit';

const discounts = createSlice({
  name: 'discounts',
  initialState: {
    allItems: [],
    Items: null,
    error: '',
    currentCoupon: {
      id: 0,
      name: '',
      type: '',
      discountInfo: '',
      channelID: 0,
      subchannelID: 0,
      isGlobal: 1,
    },
    filter: null,
    searchKeyword: '',
    loading: false,
    newItem: {
      id: '',
      mask: '',
      name: '',
      isGlobal: null,
      type: '',
      channelID: null,
      subchannelID: null,
      discountInfo: '',
      status: '',
    },
  },
  reducers: {
    getDiscountSlice: (state, action) => {
      try {
        return {
          ...state,
          allItems: (action.payload).reverse(),
          Items: action.payload,
        };
      } catch (error) {
        return error;
      }
    },
    addDiscountSlice: (state, action) => {
      const newList = action.payload.discounts;
      newList.push(action.payload.discount);
      return {
        ...state,
        allItems: newList,
        Items: newList,
      };
    },
    addCurrentCouponDiscountSlice: (state, action) => {
      const newList = action.payload.discounts;
      return {
        ...state,
        currentCoupon: newList,
      };
    },
    updateDiscountSlice: (state, action) => {
      const discountID = action.payload.discount.id;
      const newList = action.payload.discounts.filter(
        (item) => item.id !== discountID
      );
      newList.push(action.payload.discount);
      return {
        ...state,
        allItems: (newList).reverse(),
        Items: newList,
      };
    },
    removeDiscountSlice: (state, action) => {
      const discountID = action.payload.discount.id;
      const newList = action.payload.discounts.filter(
        (item) => item.id !== discountID
      );
      newList.push(action.payload.discount);
      return {
        ...state,
        allItems: (newList).reverse(),
        Items: newList,
      };
    },
    openFormDiscountSlice: (state, action) => {
      console.log(action);
      return { ...state, addItem: true };
    },
    closeFormDiscountSlice: (state, action) => {
      console.log(action);
      return { ...state, addItem: false };
    },
    searchDiscountSlice: (state, action) => {
      const filter = action.payload.filter.toLowerCase();
      const newList = action.payload.discounts.filter(function (element) {
        return element.name.toLowerCase().indexOf(filter) !== -1;
      });
      return {
        ...state,
        allItems: (newList).reverse(),
        Items: newList,
      };
    },
  },
});

export const {
  getDiscountSlice,
  addDiscountSlice,
  updateDiscountSlice,
  openFormDiscountSlice,
  closeFormDiscountSlice,
  removeDiscountSlice,
  searchDiscountSlice,
  addCurrentCouponDiscountSlice,
} = discounts.actions;
export default discounts.reducer;
