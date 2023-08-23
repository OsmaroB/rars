import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// product
export const getProduct = async () => axios.get('/products', headerUrl);
export const getProductForId = async (id) => {axios.get(`/products/${id}`, headerUrl)};
export const addProduct = async (product) => {await axios.post('/products', product, headerUrl)};
export const updateProduct = async (product) => {axios.put(`/products/${product.id}`, product, headerUrl)};
export const removeProduct = async (product) => {axios.put(`/products-remove/${product.id}`, product, headerUrl)};