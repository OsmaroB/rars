import { put, takeEvery } from 'redux-saga/effects';
import{
    getSubmodifier as getSubmodifierAPI,
    addSubmodifier as addSubmodifierAPI,
    updateSubmodifier as updateSubmodifierAPI,
    removeSubmodifier as removeSubmodifierAPI,
} from '../../apis/submodifier'
import {
    getSubmodifierSlice,
    openFormSubmodifierSlice,
    closeFormSubmodifierSlice,
    addSubmodifierSlice,
    updateSubmodifierSlice,
    removeSubmodifierSlice,
    searchSubmodifierSlice
} from './slice';


import {
    GET_SUBMODIFIER,
    CLOSE_FORM_SUBMODIFIER,
    OPEN_FORM_SUBMODIFIER,
    ADD_SUBMODIFIER,
    UPDATE_SUBMODIFIER,
    REMOVE_SUBMODIFIER,
    SEARCH_SUBMODIFIER
} from '../contants';

export function* getSubmodifierSaga(){
    try {
        const submodifiers = yield getSubmodifierAPI();
        yield put(getSubmodifierSlice(submodifiers.data));
    } catch (error) {
        console.log(error);
    }
}

export function* updateSubmodifierSaga(action){
    const submodifiers = yield getSubmodifierAPI();
    yield updateSubmodifierAPI(action.submodifier);
    const newData = {...action, submodifiers:submodifiers.data};
    yield put(updateSubmodifierSlice(newData));
}

export function* addSubmodifierSaga(action){
    yield addSubmodifierAPI(action.submodifier);
    const submodifiers = yield getSubmodifierAPI();
    const newData = {...action, submodifiers:submodifiers.data};
    yield put(addSubmodifierSlice(newData));
}

export function* removeSubmodifierSaga(action){
    yield removeSubmodifierAPI(action.submodifier);
    const submodifiers = yield getSubmodifierAPI();
    const newData = {...action, submodifiers:submodifiers.data};
    yield put(removeSubmodifierSlice(newData));
}

export function* searchSubmodifierSaga(action){
    const submodifiers = yield getSubmodifierAPI();
    const newData = {...action,submodifiers:submodifiers.data};
    yield put(searchSubmodifierSlice(newData));
}

export function* openFormSubmodifierSaga(action){ yield put(openFormSubmodifierSlice(action)); }
export function* closeFormSubmodifierSaga(action){ yield put(closeFormSubmodifierSlice(action)); }


export function* SubmodifierSaga(){
    yield takeEvery(GET_SUBMODIFIER, getSubmodifierSaga);
    yield takeEvery(OPEN_FORM_SUBMODIFIER, openFormSubmodifierSaga);
    yield takeEvery(CLOSE_FORM_SUBMODIFIER, closeFormSubmodifierSaga);
    yield takeEvery(ADD_SUBMODIFIER, addSubmodifierSaga);
    yield takeEvery(UPDATE_SUBMODIFIER, updateSubmodifierSaga);
    yield takeEvery(REMOVE_SUBMODIFIER, removeSubmodifierSaga);
    yield takeEvery(SEARCH_SUBMODIFIER, searchSubmodifierSaga);
}