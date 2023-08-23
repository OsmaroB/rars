import axios from 'axios';
import { urlApi, headerUrl } from './config';

axios.defaults.baseURL = urlApi;

// Discount
export const getDiscount = async () => axios.get('/discounts', headerUrl);
export const getDiscountForId = async (id) => {
  axios.get(`/discounts/${id}`, headerUrl);
};
export const addDiscount = async (discount) => {
  await axios.post('/discounts', discount, headerUrl);
};
export const updateDiscount = async (discount) => {
  axios.put(`/discounts/${discount.id}`, discount, headerUrl);
};
export const removeDiscount = async (discount) => {
  axios.put(`/discounts-remove/${discount.id}`, discount, headerUrl);
};
