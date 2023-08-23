/* eslint-disable prettier/prettier */
import { put, take, takeEvery } from 'redux-saga/effects';
import {
    getCashDeskClosingSlice,
    startCashDeskClosingSlice,
    removeCashDeskClosingSlice,
    updateCashDeskClosingSlice,
    addCashDeskClosingSlice,
    updatePrettyCashDeskClosingSlice,
} from './slice';
import {
    getCashDeskClosing as getCashDeskClosingAPI,
    addCashDeskClosing as addCashDeskClosingAPI,
    updateCashDeskClosing as updateCashDeskClosingAPI,
    removeCashDeskClosing as removeCashDeskClosingAPI,
    startCashDeskClosing as startCashDeskClosingAPI,
    updatePrettyCashDeskClosing as updatePrettyCashDeskClosingAPI,
} from '../../apis/cash-desk-closing';
import {
    ADD_CASH_DESK_CLOSING,
    START_CASH_DESK_CLOSING,
    UPDATE_CASH_DESK_CLOSING,
    REMOVE_CASH_DESK_CLOSING,
    GET_CASH_DESK_CLOSING,
    UPDATE_PRETTY_CASH_DESK_CLOSING,
} from '../contants';

export function* getAllCashDeskClosingSaga() {
    const cashdesk = yield getCashDeskClosingAPI();
    console.log(cashdesk);
    yield put(getCashDeskClosingSlice(cashdesk.data));
}
export function* addCashDeskClosingSaga(action) {
    const cashdesk = yield addCashDeskClosingAPI(action.cashdeskclosing);
    // const outputs = yield getCashDeskClosingAPI(action.outputscashdesk);
    const newData = { ...action, cashdesk: cashdesk.data };
    yield put(addCashDeskClosingSlice(newData));
}
export function* startCashDeskClosingSaga(action) {
    try {
        const cashdesk = yield startCashDeskClosingAPI(action.cashdeskclosing);
        // const outputs = yield getCashDeskClosingAPI(action.outputscashdesk);
        const newData = { ...action, cashdesk: cashdesk.data };
        localStorage.setItem("idcashdesk", cashdesk.id);
        yield put(startCashDeskClosingSlice(newData));
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}
export function* updateCashDeskClosingSaga(action) {
    console.log(action)
    // const cashdeskclosing = yield getCashDeskClosingAPI();
    const cashdesk=yield updateCashDeskClosingAPI(action.cashdesk);
    console.log(cashdesk)
    const newData = { ...action, cashdesk: cashdesk.data };
    yield put(updateCashDeskClosingSlice(newData));
}
export function* updatePrettyCashDeskClosingSaga(action) {
    // const cashdeskclosing = yield getCashDeskClosingAPI();
    const cashdesk=yield updatePrettyCashDeskClosingAPI(action.cashdesk);
    const newData = { cashdesk: cashdesk.data };
    yield put(updatePrettyCashDeskClosingSlice(newData));
}
export function* removeCashDeskClosingSaga(action) {
    console.log(action)
    const cashdeskclosing = yield getCashDeskClosingAPI();
    yield removeCashDeskClosingAPI(action.cashdesk);
    const newData = { ...action, cashdesk: cashdeskclosing.data };
    yield put(updateCashDeskClosingSlice(newData));
}

export function* cashDeskSaga() {
    yield takeEvery(GET_CASH_DESK_CLOSING, getAllCashDeskClosingSaga);
    yield takeEvery(ADD_CASH_DESK_CLOSING, addCashDeskClosingSaga);
    yield takeEvery(START_CASH_DESK_CLOSING, startCashDeskClosingSaga);
    yield takeEvery(UPDATE_CASH_DESK_CLOSING, updateCashDeskClosingSaga);
    yield takeEvery(REMOVE_CASH_DESK_CLOSING, removeCashDeskClosingSaga);
    yield takeEvery(UPDATE_PRETTY_CASH_DESK_CLOSING,updatePrettyCashDeskClosingSaga);
}
