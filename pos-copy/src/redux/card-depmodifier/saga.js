import { put, takeEvery } from 'redux-saga/effects';
import {
    getAllCardDepmodifierSlice, 
    closeCardFormDepmodifierSlice,
    openCardFormDepmodifierSlice,
} from './slice';
import {
    GET_ALL_CARD_DEPMODIFIER, 
    CLOSE_CARD_FORM_DEPMODIFIER, 
    OPEN_CARD_FORM_DEPMODIFIER, 
} from '../contants';

export function* getAllCardDepmodifierSaga(){
    yield put(getAllCardDepmodifierSlice());
}
export function* closeCardFormDepmodifierSaga(){
    yield put(closeCardFormDepmodifierSlice());
}
export function* openCardFormDepmodifierSaga(){
    yield put(openCardFormDepmodifierSlice());
}



export function* cardDepmodifierSaga(){
    yield takeEvery(GET_ALL_CARD_DEPMODIFIER, getAllCardDepmodifierSaga);
    yield takeEvery(CLOSE_CARD_FORM_DEPMODIFIER, closeCardFormDepmodifierSaga);
    yield takeEvery(OPEN_CARD_FORM_DEPMODIFIER, openCardFormDepmodifierSaga);

}