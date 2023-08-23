import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Modifier
export const getSaleDetail = async () => axios.get('/sale-details', headerUrl);
export const getSaleDetailForId = async (id) => {axios.get(`/sale-details/${id}`, headerUrl)};
export const getSaleDetailForSaleID = async (sale) => {
    const data = await axios.post(`/sale-details-for-sale`,sale, headerUrl);
    return data.data;
};

export const getSaleDetailForSalesID = async (sale) => {
    const data = await axios.post('/sale-details-for-saleID', sale, headerUrl);
    return data.data;
}
export const addSaleDetail = async (sale) => {
    const data = await axios.post('/sale-details', sale, headerUrl);
    return data.data;
};
// export const updateSaleDetail = async (sale) => {axios.put(`/sale-details/${sale.id}`, sale, headerUrl)};
export const removeSaleDetail = async (sale) => {axios.put(`/sale-details-remove/${sale.id}`, sale, headerUrl)};