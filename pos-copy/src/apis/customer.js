import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Categories
export const getCustomer = async () => axios.get('/customers', headerUrl);
export const getCustomerForId = async (id) => {axios.get(`/customers/${id}`, headerUrl)};
export const addCustomer = async (customer) => {
    const data =  await axios.post('/customers', customer, headerUrl);
    return data.data
};
export const customerRepeat = async (customer) => {
    const data =  await axios.post('/customer-repeat', customer, headerUrl);
    return data.data
};
export const customerEmailRepeat = async (customer) => {
    const data =  await axios.post('/customer-email-repeat', customer, headerUrl);
    return data.data
};
export const updateCustomer = async (customer) => {
    await axios.put(`/customers/${customer.id}`, customer, headerUrl);
};
export const removeCustomer = async (customer) => {
    axios.put(`/customers-remove/${customer.id}`,customer, headerUrl)
};