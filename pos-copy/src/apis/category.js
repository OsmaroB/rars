import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Categories
export const getCategory = async () => axios.get('/categories', headerUrl);
export const getCategoryForId = async (id) => {axios.get(`/categories/${id}`, headerUrl)};
export const addCategory = async (category) => {await axios.post('/categories', category, headerUrl)};
export const updateCategory = async (category) => {axios.put(`/categories/${category.id}`, category, headerUrl)};
export const removeCategory = async (category) => {axios.put(`/categories-remove/${category.id}`,category, headerUrl)};