import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Modifier
export const getSale = async () => {
    const data = await axios.get('/sales', headerUrl);
    return data.data;
};
export const getSaleForId = async (id) => {axios.get(`/sales/${id}`, headerUrl)};
export const addSale = async (sale) => {
    const data = await axios.post('/sales', sale, headerUrl);
    return data.data;
};
export const updateSale = async (sale) => {axios.put(`/sales/${sale.id}`, sale, headerUrl)};
export const removeSale = async (sale) => {
    const data = await axios.put(`/sales-remove/${sale.id}`, sale, headerUrl)
    
};
export const canceledSale = async (sale) => {
    const data = await axios.post(`/canceled-sales`, sale, headerUrl);
    return data.data;
}

export const getSalesForCut = async (cutID) => {
    return await axios.get(`/sales-desk/${cutID}`, headerUrl);
};