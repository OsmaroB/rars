import axios from 'axios';
import { urlApi, headerUrl } from './config';

axios.defaults.baseURL = urlApi;

// Detail subchannel
export const getDetailPaymentMethodCashClosing = async () =>
  axios.get('/detail-payment-method-cash-closing', headerUrl);
export const addDetailPaymentMethodCashClosing = async (detailpayment) => {
  return await axios.post(
    '/detail-payment-method-cash-closing',
    detailpayment,
    headerUrl
  );
};
export const updateDetailPaymentMethodCashClosing = async (detailpayment) => {
  axios.put(
    `/detail-payment-method-cash-closing/${detailpayment.id}`,
    detailpayment,
    headerUrl
  );
};
export const removeDetailPaymentMethodCashClosing = async (detailpayment) => {
  await axios.put(
    `/detail-payment-method-cash-closing/${detailpayment.id}`,
    detailpayment,
    headerUrl
  );
};
export const readDetailPaymentMethodCashClosingForCashRegister = async (
  detailpayment
) => {
  return await axios
    .post(
      `/detail-payment-method-cash-closing-for-cash-desk-closing`,
      detailpayment,
      headerUrl
    )
};
