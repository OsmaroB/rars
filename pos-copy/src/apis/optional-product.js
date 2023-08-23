
import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getOptionalProduct = async () => axios.get('/optional-products', headerUrl);
export const getOptionalProductForId = async (id) => {axios.get(`/optional-products/${id}`, headerUrl)};
export const addOptionalProduct = async (optionalProduct) => {
    await axios.post('/optional-products', optionalProduct, headerUrl);
};
export const updateOptionalProduct = async (optionalProduct) => {axios.put(`/optional-products/${optionalProduct.id}`, optionalProduct, headerUrl)};
export const removeOptionalProduct = async (optionalProduct) => {axios.put(`/optional-products-remove/${optionalProduct.id}`, optionalProduct, headerUrl)};