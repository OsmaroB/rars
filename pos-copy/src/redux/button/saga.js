import { put, takeEvery } from 'redux-saga/effects';
import {
    getButton as getButtonAPI,
    addButton as addButtonAPI,
    updateButton as updateButtonAPI,
    removeButton as removeButtonAPI,
} from '../../apis/button';
import {
    getButtonSlice,
    openFormButtonSlice,
    closeFormButtonSlice,
    addButtonSlice,
    updateButtonSlice,
    removeButtonSlice,
    searchButtonSlice,
} from './slice';
import {
    GET_BUTTON,
    CLOSE_FORM_BUTTON,
    OPEN_FORM_BUTTON,
    ADD_BUTTON,
    UPDATE_BUTTON,
    REMOVE_BUTTON,
    SEARCH_BUTTON,
} from '../contants';

export function* getButtonSaga(){
    try {
        const buttons = yield getButtonAPI();
        yield put(getButtonSlice(buttons.data));
    } catch (error) {
        console.log(error);
    }
}
export function* updateButtonSaga(action){
    const buttons = yield getButtonAPI();
    yield updateButtonAPI(action.button);
    const newData = {...action, buttons:buttons.data};
    yield put(updateButtonSlice(newData));
}

export function* addButtonSaga(action){
    yield addButtonAPI(action.button);
    const buttons = yield getButtonAPI();
    const newData = {...action, buttons:buttons.data};
    yield put(addButtonSlice(newData));
}

export function* removeButtonSaga(action){
    const buttons = yield getButtonAPI();
    yield removeButtonAPI(action.button);
    const newData = {...action, buttons:buttons.data};
    yield put(removeButtonSlice(newData));
}

export function* searchButtonSaga(action){
    const buttons = yield getButtonAPI();
    const newData = {...action,buttons:buttons.data};
    yield put(searchButtonSlice(newData));
}

export function* openFormButtonSaga(action){ yield put(openFormButtonSlice(action)); }
export function* closeFormButtonSaga(action){ yield put(closeFormButtonSlice(action)); }


export function* buttonSaga(){
    yield takeEvery(GET_BUTTON, getButtonSaga);
    yield takeEvery(OPEN_FORM_BUTTON, openFormButtonSaga);
    yield takeEvery(CLOSE_FORM_BUTTON, closeFormButtonSaga);
    yield takeEvery(ADD_BUTTON, addButtonSaga);
    yield takeEvery(UPDATE_BUTTON, updateButtonSaga);
    yield takeEvery(REMOVE_BUTTON, removeButtonSaga);
    yield takeEvery(SEARCH_BUTTON, searchButtonSaga);
}