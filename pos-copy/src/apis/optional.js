import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Employee
export const getOptional = async () => axios.get('/optionals', headerUrl);
export const getOptionalForId = async (id) => {axios.get(`/optionals/${id}`, headerUrl)};
export const addOptional = async (optional) => {
    await axios.post('/optionals', optional, headerUrl);
};
export const updateOptional = async (optional) => {axios.put(`/optionals/${optional.id}`, optional, headerUrl)};
export const removeOptional = async (optional) => {axios.put(`/optionals-remove/${optional.id}`, optional, headerUrl)};