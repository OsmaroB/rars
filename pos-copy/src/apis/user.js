import axios from 'axios';
import { urlApi, headerUrl } from './config';

axios.defaults.baseURL = urlApi;

// Users
export const getUser = async () => axios.get('/users', headerUrl);
export const getUserForId = async (id) => {
  axios.get(`/users/${id}`, headerUrl);
};
export const addUser = async (user) => {
  const data = await axios.post('/users', user, headerUrl);
  return {data:data.data};
};
export const addCode = async (user) => {
  return axios.put(`/add-code-authorization/${user.id}`, user, headerUrl);
};
export const updateUser = async (user) => {
  const data = await axios.put(`/users/${user.id}`, user, headerUrl)
  return {data:data.data}
};
export const removeUser = async (user) => {
  axios.put(`/users-remove/${user.id}`, user, headerUrl);
};
export const checkCode = async (user) => {
  return axios.post(`/get-user-for-code`, user, headerUrl);
};
export const userRepeat = async (user) => {
  return axios.post(`/user-repeat`, user, headerUrl);
};
