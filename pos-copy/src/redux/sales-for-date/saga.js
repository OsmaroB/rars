import { put, takeEvery } from 'redux-saga/effects';
import {
  getSalesfordateChannelSlice,
  getSalesfordatePaymentSlice,
  getSalesfordate,
} from './slice';
import {
  getSalesfordateChannel as getSalesfordateChannelAPI,
  getSalesfordatePayment as getSalesfordatePaymentAPI,
} from '../../apis/sales-for-date';
import {
  GET_ALL_SALES_FOR_DATE,
  GET_SALES_FOR_DATE_CHANNELS,
  GET_SALES_FOR_DATE_PAYMENT,
} from '../contants';

export function* getSalesfordatepaymentSaga(action) {
  console.log(action.salesfordate);
  const salespayment = yield getSalesfordatePaymentAPI(action.salesfordate);
  console.log(salespayment);
  if (salespayment) {
    yield put(getSalesfordatePaymentSlice(salespayment.data));
  }
}
export function* getSalesfordatechannelSaga(action) {
  const saleschannel = yield getSalesfordateChannelAPI(action.salesfordate);
  console.log(saleschannel);
  if (saleschannel) {
    yield put(getSalesfordateChannelSlice(saleschannel.data));
  }
}
export function* salesForDateSaga() {
  yield takeEvery(GET_SALES_FOR_DATE_CHANNELS, getSalesfordatechannelSaga);
  yield takeEvery(GET_SALES_FOR_DATE_PAYMENT, getSalesfordatepaymentSaga);
}
