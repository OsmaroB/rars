import { put, takeEvery } from 'redux-saga/effects';
import{
    getDepmodifier as getDepmodifierAPI,
    addDepmodifier as addDepmodifierAPI,
    updateDepmodifier as updateDepmodifierAPI,
    removeDepmodifier as removeDepmodifierAPI,
} from '../../apis/depmodifier'
import {
    getDepmodifierSlice,
    openFormDepmodifierSlice,
    closeFormDepmodifierSlice,
    addDepmodifierSlice,
    updateDepmodifierSlice,
    removeDepmodifierSlice,
    searchDepmodifierSlice
} from './slice';


import {
    GET_DEPMODIFIER,
    CLOSE_FORM_DEPMODIFIER,
    OPEN_FORM_DEPMODIFIER,
    ADD_DEPMODIFIER,
    UPDATE_DEPMODIFIER,
    REMOVE_DEPMODIFIER,
    SEARCH_DEPMODIFIER,
} from '../contants';

export function* getDepmodifierSaga(){
    try {
        const depmodifiers = yield getDepmodifierAPI();
        yield put(getDepmodifierSlice(depmodifiers.data));
    } catch (error) {
        console.log(error);
    }
}

export function* updateDepmodifierSaga(action){
    const depmodifiers = yield getDepmodifierAPI();
    yield updateDepmodifierAPI(action.depmodifier);
    const newData = {...action, depmodifiers:depmodifiers.data};
    yield put(updateDepmodifierSlice(newData));
}

export function* addDepmodifierSaga(action){
    yield addDepmodifierAPI(action.depmodifier);
    const depmodifiers = yield getDepmodifierAPI();
    const newData = {...action, depmodifiers:depmodifiers.data};
    yield put(addDepmodifierSlice(newData));
}

export function* removeDepmodifierSaga(action){
    yield removeDepmodifierAPI(action.depmodifier);
    const depmodifiers = yield getDepmodifierAPI();
    const newData = {...action, depmodifiers:depmodifiers.data};
    yield put(removeDepmodifierSlice(newData));
}

export function* searchDepmodifierSaga(action){
    const depmodifiers = yield getDepmodifierAPI();
    const newData = {...action,depmodifiers:depmodifiers.data};
    yield put(searchDepmodifierSlice(newData));
}

export function* openFormDepmodifierSaga(action){ yield put(openFormDepmodifierSlice(action)); }
export function* closeFormDepmodifierSaga(action){ yield put(closeFormDepmodifierSlice(action)); }


export function* depmodifierSaga(){
    yield takeEvery(GET_DEPMODIFIER, getDepmodifierSaga);
    yield takeEvery(OPEN_FORM_DEPMODIFIER, openFormDepmodifierSaga);
    yield takeEvery(CLOSE_FORM_DEPMODIFIER, closeFormDepmodifierSaga);
    yield takeEvery(ADD_DEPMODIFIER, addDepmodifierSaga);
    yield takeEvery(UPDATE_DEPMODIFIER, updateDepmodifierSaga);
    yield takeEvery(REMOVE_DEPMODIFIER, removeDepmodifierSaga);
    yield takeEvery(SEARCH_DEPMODIFIER, searchDepmodifierSaga);
}