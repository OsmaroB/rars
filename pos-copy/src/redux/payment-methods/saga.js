import { put, takeEvery } from 'redux-saga/effects';
import {
    getPaymentMethod as getPaymentMethodAPI,
    addPaymentMethod as addPaymentMethodAPI,
    updatePaymentMethod as updatePaymentMethodAPI,
    removePaymentMethod as removePaymentMethodAPI,
} from '../../apis/payment-method';
import { 
    getPaymentMethodSlice,
    addPaymentMethodSlice,
    openFormPaymentMethodSlice,
    closeFormPaymentMethodSlice,
    updatePaymentMethodSlice,
    searchPaymentMethodSlice,
} from './slice';
import { 
    GET_PAYMENT_METHOD,
    ADD_PAYMENT_METHOD,
    OPEN_FORM_PAYMENT_METHOD,
    CLOSE_FORM_PAYMENT_METHOD,
    UPDATE_PAYMENT_METHOD,
    REMOVE_PAYMENT_METHOD,
    SEARCH_PAYMENT_METHOD
} from '../contants';

export function* getPaymentMethodSaga(){
    const paymentMethods = yield getPaymentMethodAPI();
    yield put(getPaymentMethodSlice(paymentMethods.data));
}

export function* updatePaymentMethodSaga(action){
    const paymentMethods = yield getPaymentMethodAPI();
    yield updatePaymentMethodAPI(action.paymentMethod);
    const newData = {...action, paymentMethods:paymentMethods.data};
    yield put(updatePaymentMethodSlice(newData));
}

export function* addPaymentMethodSaga(action){
    yield addPaymentMethodAPI(action.paymentMethod);
    const paymentMethods = yield getPaymentMethodAPI();
    const newData = {...action, paymentMethods:paymentMethods.data};
    yield put(addPaymentMethodSlice(newData));
}

export function* removePaymentMethodSaga(action){
    const paymentMethods = yield getPaymentMethodAPI();
    yield removePaymentMethodAPI(action.paymentMethod);
    const newData = {...action, paymentMethods:paymentMethods.data};
    yield put(updatePaymentMethodSlice(newData));
}

export function* searchPaymentMethodSaga(action){
    const paymentMethods = yield getPaymentMethodAPI();
    const newData = {...action,paymentMethods:paymentMethods.data};
    yield put(searchPaymentMethodSlice(newData));
}

export function* openFormPaymentMethodSaga(action){ yield put(openFormPaymentMethodSlice(action)); }
export function* closeFormPaymentMethodSaga(action){ yield put(closeFormPaymentMethodSlice(action)); }


export function* paymentMethodSaga(){
    yield takeEvery(GET_PAYMENT_METHOD, getPaymentMethodSaga);
    yield takeEvery(ADD_PAYMENT_METHOD, addPaymentMethodSaga);
    yield takeEvery(OPEN_FORM_PAYMENT_METHOD, openFormPaymentMethodSaga);
    yield takeEvery(CLOSE_FORM_PAYMENT_METHOD, closeFormPaymentMethodSaga);
    yield takeEvery(UPDATE_PAYMENT_METHOD, updatePaymentMethodSaga);
    yield takeEvery(REMOVE_PAYMENT_METHOD, removePaymentMethodSaga);
    yield takeEvery(SEARCH_PAYMENT_METHOD, searchPaymentMethodSaga);
}