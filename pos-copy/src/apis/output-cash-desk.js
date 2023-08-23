import axios from 'axios';
import { urlApi, headerUrl } from './config';

axios.defaults.baseURL = urlApi;

// Output-cash
export const getOutputCash = async () =>
  axios.get('/output-cash-desk', headerUrl);

export const addOutputCash = async (outputcash) => {
  await axios.post('/output-cash-desk', outputcash, headerUrl);
};
export const updateOutputCash = async (outputcash) => {
  axios.put(`/output-cash-desk/${outputcash.id}`, outputcash, headerUrl);
};
export const removeoutputcash = async (outputcash) => {
  axios.put(`/output-cash-desk-remove/${outputcash.id}`, outputcash, headerUrl);
};
export const getOutputCashForCut = async (outputscashdesk) => {
  return axios.post(`/output-cash-desk-for-cut`, outputscashdesk, headerUrl);
};
export const getOutputCashForCutAndStatus = async (outputcash) => {
  return axios.post(`/output-cash-desk-for-cut-and-status`, outputcash, headerUrl);
};
