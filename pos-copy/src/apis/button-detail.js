import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getButtonDetail = async () =>  axios.get('/button-details', headerUrl);

export const getButtonDetailForId = async (id) => {axios.get(`/button-details/${id}`, headerUrl)};
export const addButtonDetail = async (buttonDetail) => {await axios.post('/button-details', buttonDetail, headerUrl)};
export const updateButtonDetail = async (buttonDetail) => {axios.put(`/button-details/${buttonDetail.id}`, buttonDetail, headerUrl)};
export const removeButtonDetail = async (buttonDetail) => {axios.put(`/button-details-remove/${buttonDetail.id}`, buttonDetail, headerUrl)};