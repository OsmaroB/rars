import axios from 'axios';
import { urlApi, headerUrl } from './config';

axios.defaults.baseURL = urlApi;
export const getSalesfordatePayment = async (salesfordate) => {
  return axios.post(
    `/sales-for-date-payment-cashregister`,
    salesfordate,
    headerUrl
  );
};
export const getSalesfordateChannel = async (salesfordate) => {
  return axios.post(
    `/sales-for-date-channel-cashregister`,
    salesfordate,
    headerUrl
  );
};

export const getSalesForDate = async (sales) =>{
  const data = await axios.post('/sales-for-date',
    sales,
    headerUrl
  )
  console.log(data);
  return data.data;
}