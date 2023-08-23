import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Modifier
export const getSubmodifier = async () => axios.get('/submodifiers', headerUrl);
export const getSubmodifierForId = async (id) => {axios.get(`/submodifiers/${id}`, headerUrl)};
export const addSubmodifier = async (submodifier) => {
    console.log(submodifier);
    await axios.post('/submodifiers', submodifier, headerUrl);
};
export const updateSubmodifier = async (submodifier) => {axios.put(`/submodifiers/${submodifier.id}`, submodifier, headerUrl)};
export const removeSubmodifier = async (submodifier) => {
    await axios.put(`/submodifiers-remove/${submodifier.id}`, submodifier, headerUrl)
};