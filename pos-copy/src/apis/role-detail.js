import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Employee
export const getRoleDetail = async () => axios.get('/roles-detail', headerUrl);
export const getRoleDetailForId = async (id) => {axios.get(`/roles-detail/${id}`, headerUrl)};
export const addRoleDetail = async (roleDetail) => {await axios.post('/roles-detail', roleDetail, headerUrl)};
export const updateRoleDetail = async (roleDetail) => {axios.put(`/roles-detail/${roleDetail.id}`, roleDetail, headerUrl)};
export const removeRoleDetail = async (roleDetail) => {axios.put(`/roles-detail-remove/${roleDetail.id}`, roleDetail, headerUrl)};