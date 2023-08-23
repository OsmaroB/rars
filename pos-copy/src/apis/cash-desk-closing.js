import axios from 'axios';
import { urlApi, headerUrl } from './config';

axios.defaults.baseURL = urlApi;

export const getCashDeskClosing = async () =>
  axios.get('/cash-desk-closing', headerUrl);

export const addCashDeskClosing = async (cashdeskclosing) => {
  return axios.post('/cash-desk-closing', cashdeskclosing, headerUrl);
};
export const readCashClosing = async (cashdeskclosing) => {
  return axios.post(
    '/cash-desk-closing-for-date-cashdesk-status',
    cashdeskclosing,
    headerUrl
  );
};

export const readCashDeskPending = async (cashdeskclosing) => {
  const data = await axios.get(`/sales-desk/${cashdeskclosing.id}`, headerUrl);
  return await axios.get(`/sales-desk/${cashdeskclosing.id}`, headerUrl);
};

export const updateCashDeskClosing = async (cashdeskclosing) => {
  return axios.put(
    `/cash-desk-closing/${cashdeskclosing.id}`,
    cashdeskclosing,
    headerUrl
  );
};
export const updatePrettyCashDeskClosing = async (cashdeskclosing) => {
  return axios.put(
    `/update-pretty-cash/${cashdeskclosing.id}`,
    cashdeskclosing,
    headerUrl
  );
};

export const readCashDeskClosingForDateCashDeskStatus = async (
  cashdeskclosing
) => {
  const data = await axios.post(
    `/cash-desk-closing-for-date-cashdesk-status`,
    cashdeskclosing,
    headerUrl
  );
  return data.data;
};

export const updateCashCashDeskClosing = async (cashdeskclosing) => {
  return axios.put(
    `/update-cash-cash/${cashdeskclosing.id}`,
    cashdeskclosing,
    headerUrl
  );
};
export const removeCashDeskClosing = async (cashdeskclosing) => {
  axios.put(
    `/cash-desk-closing/${cashdeskclosing.id}`,
    cashdeskclosing,
    headerUrl
  );
};
export const startCashDeskClosing = async (cashdeskclosing) => {
  const data =  await axios.post('/start-desk-closing-x', cashdeskclosing, headerUrl);
  return data.data;
};
export const checkCutzPending = async (cashdeskclosing) => {
  const data =  await axios.post(
    '/cash-desk-closing-type-date-cashregister',
    cashdeskclosing,
    headerUrl
  );
  return {data};
};
