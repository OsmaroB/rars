import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getCategoryButton = async () => axios.get('/category-buttons', headerUrl);
export const getCategoryButtonForId = async (id) => {axios.get(`/category-buttons/${id}`, headerUrl)};
export const addCategoryButton = async (categoryButton) => {await axios.post('/category-buttons', categoryButton, headerUrl)};
export const updateCategoryButton = async (categoryButton) => {axios.put(`/category-buttons/${categoryButton.id}`, categoryButton, headerUrl)};
export const removeCategoryButton = async (categoryButton) => {axios.put(`/category-buttons-remove/${categoryButton.id}`, categoryButton, headerUrl)};