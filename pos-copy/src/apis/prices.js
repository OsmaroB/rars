import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// prices
export const getPrice = async () =>{ 
    const data = await axios.get('/prices', headerUrl)
    return data.data;
};
export const getPriceForId = async (id) => {axios.get(`/prices/${id}`, headerUrl)};
export const addPrice = async (price) => {
    const data = await axios.post('/prices', price, headerUrl)
    return data.data;
};
export const updatePrice = async (price) => {axios.put(`/prices/${price.id}`, price, headerUrl)};
export const removePrice = async (price) => {axios.put(`/prices-remove/${price.id}`, price, headerUrl)};
export const getPricesForChannelAndCategory = async (price) => {
    const data = await axios.post(`/customer-sales-for-channel`, price, headerUrl);
    return data.data;
};