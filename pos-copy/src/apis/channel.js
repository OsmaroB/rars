import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// channels
export const getChannel = async () => axios.get('/channels', headerUrl);
export const getChannelForId = async (id) => {axios.get(`/channels/${id}`, headerUrl)};
export const addChannel = async (channel) => {await axios.post('/channels', channel, headerUrl)};
export const updateChannel = async (channel) => {axios.put(`/channels/${channel.id}`, channel, headerUrl)};
export const removeChannel = async (channel) => {axios.put(`/channels-remove/${channel.id}`,channel, headerUrl)};
