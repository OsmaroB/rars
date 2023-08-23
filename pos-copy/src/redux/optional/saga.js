import { put, takeEvery } from 'redux-saga/effects';
import {
    getOptional as getOptionalAPI,
    addOptional as addOptionalAPI,
    updateOptional as updateOptionalAPI,
    removeOptional as removeOptionalAPI,

} from '../../apis/optional';
import {
    getOptionalSlice,
    openFormOptionalSlice,
    closeFormOptionalSlice,
    addOptionalSlice,
    updateOptionalSlice,
    removeOptionalSlice,
    searchOptionalSlice,
} from './slice';
import {
    GET_OPTIONAL,
    CLOSE_FORM_OPTIONAL,
    OPEN_FORM_OPTIONAL,
    ADD_OPTIONAL,
    UPDATE_OPTIONAL,
    REMOVE_OPTIONAL,
    SEARCH_OPTIONAL
} from '../contants';

export function* getOptionalSaga(){
    const optionals = yield getOptionalAPI();
    yield put(getOptionalSlice(optionals.data));
}

export function* updateOptionalSaga(action){
    const optionals = yield getOptionalAPI();
    yield updateOptionalAPI(action.optional);
    const newData = {...action, optionals:optionals.data};
    yield put(updateOptionalSlice(newData));
}

export function* addOptionalSaga(action){
    yield addOptionalAPI(action.optional);
    const optionals = yield getOptionalAPI();
    const newData = {...action, optionals:optionals.data};
    yield put(addOptionalSlice(newData));
}

export function* removeOptionalSaga(action){
    const optionals = yield getOptionalAPI();
    yield removeOptionalAPI(action.optional);
    const newData = {...action, optionals:optionals.data};
    yield put(removeOptionalSlice(newData));
}

export function* searchOptionalSaga(action){
    const optionals = yield getOptionalAPI();
    const newData = {...action,optionals:optionals.data};
    yield put(searchOptionalSlice(newData));
}

export function* openFormOptionalSaga(action){ yield put(openFormOptionalSlice(action)); }
export function* closeFormOptionalSaga(action){ yield put(closeFormOptionalSlice(action)); }


export function* optionalSaga(){
    yield takeEvery(GET_OPTIONAL, getOptionalSaga);
    yield takeEvery(OPEN_FORM_OPTIONAL, openFormOptionalSaga);
    yield takeEvery(CLOSE_FORM_OPTIONAL, closeFormOptionalSaga);
    yield takeEvery(ADD_OPTIONAL, addOptionalSaga);
    yield takeEvery(UPDATE_OPTIONAL, updateOptionalSaga);
    yield takeEvery(REMOVE_OPTIONAL, removeOptionalSaga);
    yield takeEvery(SEARCH_OPTIONAL, searchOptionalSaga);
}