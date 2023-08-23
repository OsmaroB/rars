import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getRole = async () => axios.get('/roles', headerUrl);
export const getRoleForId = async (id) => {axios.get(`/roles/${id}`, headerUrl)};
export const addRole = async (role) => {await axios.post('/roles', role, headerUrl)};
export const updateRole = async (role) => {axios.put(`/roles/${role.id}`, role, headerUrl)};
export const removeRole = async (role) => {axios.put(`/roles-remove/${role.id}`, role, headerUrl)};