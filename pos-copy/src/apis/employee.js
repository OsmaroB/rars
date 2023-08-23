import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Employee
export const getEmployee = async () => axios.get('/employees', headerUrl);
export const getEmployeeForId = async (id) => {axios.get(`/employees/${id}`, headerUrl)};
export const addEmployee = async (employee) => {await axios.post('/employees', employee, headerUrl)};
export const updateEmployee = async (employee) => {axios.put(`/employees/${employee.id}`, employee, headerUrl)};
export const removeEmployee = async (employee) => {axios.put(`/employees-remove/${employee.id}`, employee, headerUrl)};