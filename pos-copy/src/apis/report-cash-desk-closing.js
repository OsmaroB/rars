import axios from 'axios';
import { urlApi, headerUrl } from './config';

axios.defaults.baseURL = urlApi;

// role
export const getReport = async () =>
  axios.get('/report-cash-desk-closing', headerUrl);
export const addReport = async (report) => {
  return axios.post('/report-cash-desk-closing', report, headerUrl);
};
export const updateReport = async (report) => {
  axios.put(`/report-cash-desk-closing/${report.id}`, report, headerUrl);
};
export const removeReport = async (report) => {
  axios.put(`/report-cash-desk-closing/${report.id}`, report, headerUrl);
};
export const readReport = async (report) => {
  return await axios.post(
    `/report-cash-desk-closing-for-cash-desk`,
    report,
    headerUrl
  );
};
