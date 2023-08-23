import { put, takeEvery } from 'redux-saga/effects';
import {
    getAllCardSubmodifierSlice, 
    closeCardFormSubmodifierSlice,
    openCardFormSubmodifierSlice,
    setModifierSelectedCSIdSlice,
    statusProductCardSubmodifierSlice,
} from './slice';
import {
    GET_ALL_CARD_SUBMODIFIER, 
    CLOSE_CARD_FORM_SUBMODIFIER, 
    OPEN_CARD_FORM_SUBMODIFIER, 
    SET_MODIFIER_SELECTED_ID_CM,
    STATUS_PRODUCT_CARD_SUBMODIFIER,
} from '../contants';

export function* getAllCardSubmodifierSaga(){
    yield put(getAllCardSubmodifierSlice());
}
export function* closeCardFormSubmodifierSaga(){
    yield put(closeCardFormSubmodifierSlice());
}
export function* openCardFormSubmodifierSaga(){
    yield put(openCardFormSubmodifierSlice());
}

export function* setModifierSelectedCSIdSaga(action){
    yield put(setModifierSelectedCSIdSlice(action.modifier)); 
}

export function* statusProductCardSubmodifierSaga(action){
    yield put(statusProductCardSubmodifierSlice(action));
}

export function* cardSubmodifierSaga(){
    yield takeEvery(GET_ALL_CARD_SUBMODIFIER, getAllCardSubmodifierSaga);
    yield takeEvery(CLOSE_CARD_FORM_SUBMODIFIER, closeCardFormSubmodifierSaga);
    yield takeEvery(OPEN_CARD_FORM_SUBMODIFIER, openCardFormSubmodifierSaga);
    yield takeEvery(SET_MODIFIER_SELECTED_ID_CM, setModifierSelectedCSIdSaga);
    yield takeEvery(STATUS_PRODUCT_CARD_SUBMODIFIER, statusProductCardSubmodifierSaga);
}