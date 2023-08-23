import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getButton = async () => axios.get('/buttons', headerUrl);
export const getButtonForId = async (id) => {axios.get(`/buttons/${id}`, headerUrl)};
export const addButton = async (button) => {await axios.post('/buttons', button, headerUrl)};
export const updateButton = async (button) => {axios.put(`/buttons/${button.id}`, button, headerUrl)};
export const removeButton = async (button) => {axios.put(`/buttons-remove/${button.id}`, button, headerUrl)};