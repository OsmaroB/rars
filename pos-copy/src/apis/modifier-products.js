
import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Modifier Products APIs
export const getModifierProducts = async () => axios.get('/modifier-products', headerUrl);
export const getModifierProductsForId = async (id) => {
    const data =  await axios.get(`/modifier-products/${id}`, headerUrl);
    return data.data;
};
export const addModifierProducts = async (modifierProduct) => {
    console.log(modifierProduct);
    const data = await axios.post('/modifier-products', modifierProduct, headerUrl);
    console.log(data);
};
export const updateModifierProducts = async (modifierProduct) => {axios.put(`/modifier-products/${modifierProduct.id}`, modifierProduct, headerUrl)};
export const removeModifierProducts = async (modifierProduct) => { await axios.put(`/modifier-products-remove/${modifierProduct.id}`, modifierProduct, headerUrl)};