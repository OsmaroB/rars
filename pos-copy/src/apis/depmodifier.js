import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Modifier
export const getDepmodifier = async () => axios.get('/depmodifiers', headerUrl);
export const getDepmodifierForId = async (id) => {axios.get(`/depmodifiers/${id}`, headerUrl)};
export const addDepmodifier = async (depmodifier) => {
    await axios.post('/depmodifiers', depmodifier, headerUrl);
};
export const updateDepmodifier = async (depmodifier) => {axios.put(`/depmodifiers/${depmodifier.id}`, depmodifier, headerUrl)};
export const removeDepmodifier = async (depmodifier) => {
    await axios.put(`/depmodifiers-remove/${depmodifier.id}`, depmodifier, headerUrl)
};