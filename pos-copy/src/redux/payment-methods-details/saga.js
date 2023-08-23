import { put, takeEvery } from 'redux-saga/effects';
import {
    getPaymentMethodDetail as getPaymentMethodDetailAPI,
    addPaymentMethodDetail as addPaymentMethodDetailAPI,
    updatePaymentMethodDetail as updatePaymentMethodDetailAPI,
    removePaymentMethodDetail as removePaymentMethodDetailAPI,
} from '../../apis/payment-method-detail';
import {
    addPaymentMethodDetailSlice,
    closeFormPaymentMethodDetailSlice,
    getPaymentMethodDetailSlice,
    openFormPaymentMethodDetailSlice,
    removePaymentMethodDetailSlice,
    searchPaymentMethodDetailSlice,
    updatePaymentMethodDetailSlice,
} from './slice';
import {
    ADD_PAYMENT_METHOD_DETAIL,
    CLOSE_FORM_PAYMENT_METHOD_DETAIL,
    GET_PAYMENT_METHOD_DETAIL, 
    OPEN_FORM_PAYMENT_METHOD_DETAIL,
    REMOVE_PAYMENT_METHOD_DETAIL,
    SEARCH_PAYMENT_METHOD_DETAIL,
    UPDATE_PAYMENT_METHOD_DETAIL,
} from '../contants';

export function* getPaymentMehodDetalSaga(){
    const paymentMethodDetails = yield getPaymentMethodDetailAPI();
    yield put(getPaymentMethodDetailSlice(paymentMethodDetails.data));
}

export function* updatePaymentMethodDetailSaga(action){
    yield updatePaymentMethodDetailAPI(action.paymentMethodDetail);
    const paymentMethodDetails = yield getPaymentMethodDetailAPI();
    const newData = {...action, paymentMethodDetails:paymentMethodDetails.data};
    yield put(updatePaymentMethodDetailSlice(newData));
}

export function* addPaymentMethodDetailSaga(action){
    yield addPaymentMethodDetailAPI(action.paymentMethodDetail);
    const paymentMethodDetails = yield getPaymentMethodDetailAPI();
    const newData = {...action, paymentMethodDetails:paymentMethodDetails.data};
    yield put(addPaymentMethodDetailSlice(newData));
}

export function* removePaymentMethodDetailSaga(action){
    yield removePaymentMethodDetailAPI(action.paymentMethodDetail);
    const paymentMethodDetails = yield getPaymentMethodDetailAPI();
    const newData = {...action, paymentMethodDetails:paymentMethodDetails.data};
    yield put(removePaymentMethodDetailSlice(newData));
}

export function* searchPaymentMethodDetailSaga(action){
    const paymentMethodDetails = yield getPaymentMethodDetailAPI();
    const newData = {...action,paymentMethodDetails:paymentMethodDetails.data};
    yield put(searchPaymentMethodDetailSlice(newData));
}

export function* openFormPaymentMethodDetailSaga(action){ yield put(openFormPaymentMethodDetailSlice(action)); }
export function* closeFormPaymentMethodDetailSaga(action){ yield put(closeFormPaymentMethodDetailSlice(action)); }


export function* paymentMethodDetailSaga(){
    yield takeEvery(GET_PAYMENT_METHOD_DETAIL, getPaymentMehodDetalSaga);
    yield takeEvery(OPEN_FORM_PAYMENT_METHOD_DETAIL, openFormPaymentMethodDetailSaga);
    yield takeEvery(CLOSE_FORM_PAYMENT_METHOD_DETAIL, closeFormPaymentMethodDetailSaga);
    yield takeEvery(ADD_PAYMENT_METHOD_DETAIL, addPaymentMethodDetailSaga);
    yield takeEvery(UPDATE_PAYMENT_METHOD_DETAIL, updatePaymentMethodDetailSaga);
    yield takeEvery(REMOVE_PAYMENT_METHOD_DETAIL, removePaymentMethodDetailSaga);
    yield takeEvery(SEARCH_PAYMENT_METHOD_DETAIL, searchPaymentMethodDetailSaga);
}