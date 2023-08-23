import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getTiketConfiguration = async () => {
    const data = await axios.get('/tiket-configuration', headerUrl)  
    return data.data;  
};
export const addTiketConfiguration = async (configuration) => {
    await axios.post('/tiket-configuration', configuration, headerUrl);
};
export const updateTiketConfiguration = async (configuration) => {
    await axios.put(`/tiket-configuration/${configuration.id}`, configuration, headerUrl);
};