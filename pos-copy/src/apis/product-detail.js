import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getProductDetail = async () => axios.get('/product-details', headerUrl);
export const getProductDetailForId = async (id) => {axios.get(`/product-details/${id}`, headerUrl)};
export const addProductDetail = async (productDetail) => {await axios.post('/product-details', productDetail, headerUrl)};
export const updateProductDetail = async (productDetail) => {axios.put(`/product-details/${productDetail.id}`, productDetail, headerUrl)};
export const removeProductDetail = async (productDetail) => {axios.put(`/product-details-remove/${productDetail.id}`, productDetail, headerUrl)};