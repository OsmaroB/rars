import { put, takeEvery } from 'redux-saga/effects';
import {
    getButtonDetail as getButtonDetailAPI,
    addButtonDetail as addButtonDetailAPI,
    updateButtonDetail as updateButtonDetailAPI,
    removeButtonDetail as removeButtonDetailAPI,
    
} from '../../apis/button-detail';
import {
    getButtonDetailSlice,
    openFormButtonDetailSlice,
    closeFormButtonDetailSlice,
    addButtonDetailSlice,
    updateButtonDetailSlice,
    removeButtonDetailSlice,
    searchButtonDetailSlice
} from './slice';
import {
    GET_BUTTON_DETAIL,
    OPEN_FORM_BUTTON_DETAIL,
    CLOSE_FORM_BUTTON_DETAIL,
    ADD_BUTTON_DETAIL,
    UPDATE_BUTTON_DETAIL,
    REMOVE_BUTTON_DETAIL,
    SEARCH_BUTTON_DETAIL,
} from '../contants';

export function* getButtonDetailSaga(){
    try {
        const buttonDetails = yield getButtonDetailAPI();
        yield put(getButtonDetailSlice(buttonDetails.data));
    } catch (error) {
        console.log(error);
    }
}
export function* updateButtonDetailSaga(action){
    const buttonDetails = yield getButtonDetailAPI();
    yield updateButtonDetailAPI(action.buttonDetail);
    const newData = {...action, buttonDetails:buttonDetails.data};
    yield put(updateButtonDetailSlice(newData));
}

export function* addButtonDetailSaga(action){
    yield addButtonDetailAPI(action.buttonDetail);
    const buttonDetails = yield getButtonDetailAPI();
    const newData = {...action, buttonDetails:buttonDetails.data};
    yield put(addButtonDetailSlice(newData));
}

export function* removeButtonDetailSaga(action){
    const buttonDetails = yield getButtonDetailAPI();
    yield removeButtonDetailAPI(action.buttonDetail);
    const newData = {...action, buttonDetails:buttonDetails.data};
    yield put(removeButtonDetailSlice(newData));
}

export function* searchButtonDetailSaga(action){
    const buttonDetails = yield getButtonDetailAPI();
    const newData = {...action,buttonDetails:buttonDetails.data};
    yield put(searchButtonDetailSlice(newData));
}

export function* openFormButtonDetailSaga(action){ yield put(openFormButtonDetailSlice(action)); }
export function* closeFormButtonDetailSaga(action){ yield put(closeFormButtonDetailSlice(action)); }


export function* ButtonDetailSaga(){
    yield takeEvery(GET_BUTTON_DETAIL, getButtonDetailSaga);
    yield takeEvery(OPEN_FORM_BUTTON_DETAIL, openFormButtonDetailSaga);
    yield takeEvery(CLOSE_FORM_BUTTON_DETAIL, closeFormButtonDetailSaga);
    yield takeEvery(ADD_BUTTON_DETAIL, addButtonDetailSaga);
    yield takeEvery(UPDATE_BUTTON_DETAIL, updateButtonDetailSaga);
    yield takeEvery(REMOVE_BUTTON_DETAIL, removeButtonDetailSaga);
    yield takeEvery(SEARCH_BUTTON_DETAIL, searchButtonDetailSaga);

}