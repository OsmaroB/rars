import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// subcategories
export const getSubcategory = async () => axios.get('/subcategories', headerUrl);
export const getSubcategoryForId = async (id) => {axios.get(`/subcategories/${id}`, headerUrl)};
export const addSubcategory = async (subcategory) => {await axios.post('/subcategories', subcategory, headerUrl)};
export const updateSubcategory = async (subcategory) => {axios.put(`/subcategories/${subcategory.id}`, subcategory, headerUrl)};
export const removeSubcategory = async (subcategory) => {axios.put(`/subcategories-remove/${subcategory.id}`,subcategory, headerUrl)};
