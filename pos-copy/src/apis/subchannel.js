import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// channels
export const getSubchannel = async () => axios.get('/subchannels', headerUrl);
export const getSubchannelForId = async (id) => {axios.get(`/subchannels/${id}`, headerUrl)};
export const addSubchannel = async (subchannel) => {await axios.post('/subchannels', subchannel, headerUrl)};
export const updateSubchannel = async (subchannel) => {axios.put(`/subchannels/${subchannel.id}`, subchannel, headerUrl)};
export const removeSubchannel = async (subchannel) => {axios.put(`/subchannels-remove/${subchannel.id}`,subchannel, headerUrl)};
