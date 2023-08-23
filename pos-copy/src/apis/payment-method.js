import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// PaymentMethod
export const getPaymentMethod = async () => axios.get('/payment-methods', headerUrl);
export const getPaymentMethodForId = async (id) => {axios.get(`/payment-methods/${id}`, headerUrl)};
export const addPaymentMethod = async (paymentMethod) => {await axios.post('/payment-methods', paymentMethod, headerUrl)};
export const updatePaymentMethod = async (paymentMethod) => {axios.put(`/payment-methods/${paymentMethod.id}`, paymentMethod, headerUrl)};
export const removePaymentMethod = async (paymentMethod) => {axios.put(`/payment-methods-remove/${paymentMethod.id}`,paymentMethod, headerUrl)};