import axios from 'axios';
import { urlApi, headerUrl } from './config';

axios.defaults.baseURL = urlApi;

// Detail subchannel
export const getDetailSubchannelCashClosing = async () =>
  axios.get('/detail-subchannel-cash-closing', headerUrl);
export const addDetailSubchannelCashClosing = async (detailsubchannel) => {
  return await axios.post(
    '/detail-subchannel-cash-closing',
    detailsubchannel,
    headerUrl
  );
};
export const updateDetailSubchannel = async (detailsubchannel) => {
  axios.put(
    `/detail-subchannel-cash-closing/${detailsubchannel.id}`,
    detailsubchannel,
    headerUrl
  );
};
export const removeDetailsubchannel = async (detailsubchannel) => {
  await axios.put(
    `/detail-subchannel-cash-closing/${detailsubchannel.id}`,
    detailsubchannel,
    headerUrl
  );
};
export const readDetailChannelCashClosingForCashRegister = async (
  detailsubchannel
) => {
  return await axios.post(
    `/detail-subchannel-cash-closing-for-cash-desk-closing`,
    detailsubchannel,
    headerUrl
  );
};
