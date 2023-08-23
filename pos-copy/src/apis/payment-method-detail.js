import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// PaymentMethod
export const getPaymentMethodDetail = async () => axios.get('/payment-method-details', headerUrl);
export const getPaymentMethodDetailForId = async (id) => {axios.get(`/payment-method-details/${id}`, headerUrl)};
export const addPaymentMethodDetail = async (paymentMethodDetail) => {await axios.post('/payment-method-details', paymentMethodDetail, headerUrl)};
export const updatePaymentMethodDetail = async (paymentMethodDetail) => {axios.put(`/payment-method-details/${paymentMethodDetail.id}`, paymentMethodDetail, headerUrl)};
export const removePaymentMethodDetail = async (paymentMethodDetail) => {axios.put(`/payment-method-details-remove/${paymentMethodDetail.id}`,paymentMethodDetail, headerUrl)};