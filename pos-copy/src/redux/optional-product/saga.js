import { put, takeEvery } from 'redux-saga/effects';
import {
    getOptionalProduct as getOptionalProductAPI,
    addOptionalProduct as addOptionalProductAPI,
    updateOptionalProduct as updateOptionalProductAPI,
    removeOptionalProduct as removeOptionalProductAPI,
} from '../../apis/optional-product';
import {
    getOptionalProductSlice,
    openFormOptionalProductSlice,
    closeFormOptionalProductSlice,
    addOptionalProductSlice,
    updateOptionalProductSlice,
    removeOptionalProductSlice,
    searchOptionalProductSlice,
} from './slice';
import {
    GET_OPTIONAL_PRODUCT,
    OPEN_FORM_OPTIONAL_PRODUCT,
    CLOSE_FORM_OPTIONAL_PRODUCT,
    ADD_OPTIONAL_PRODUCT,
    UPDATE_OPTIONAL_PRODUCT,
    REMOVE_OPTIONAL_PRODUCT,
    SEARCH_OPTIONAL_PRODUCT,
} from '../contants';

export function* getOptionalProductSaga(){
    const optionalProducts = yield getOptionalProductAPI();
    yield put(getOptionalProductSlice(optionalProducts.data));
}
export function* updateOptionalProductSaga(action){
    const optionalProducts = yield getOptionalProductAPI();
    yield updateOptionalProductAPI(action.optionalProduct);
    const newData = {...action, optionalProducts:optionalProducts.data};
    yield put(updateOptionalProductSlice(newData));
}

export function* addOptionalProductSaga(action){
    yield addOptionalProductAPI(action.optionalProduct);
    const optionalProducts = yield getOptionalProductAPI();
    console.log(action);
    const newData = {...action, optionalProducts:optionalProducts.data};
    yield put(addOptionalProductSlice(newData));
}

export function* removeOptionalProductSaga(action){
    const optionalProducts = yield getOptionalProductAPI();
    yield removeOptionalProductAPI(action.optionalProduct);
    const newData = {...action, optionalProducts:optionalProducts.data};
    yield put(removeOptionalProductSlice(newData));
}

export function* searchOptionalProductSaga(action){
    const optionalProducts = yield getOptionalProductAPI();
    const newData = {...action,optionalProducts:optionalProducts.data};
    yield put(searchOptionalProductSlice(newData));
}

export function* openFormOptionalProductSaga(action){ yield put(openFormOptionalProductSlice(action)); }
export function* closeFormOptionalProductSaga(action){ yield put(closeFormOptionalProductSlice(action)); }


export function* optionalProductSaga(){
    yield takeEvery(GET_OPTIONAL_PRODUCT, getOptionalProductSaga);
    yield takeEvery(OPEN_FORM_OPTIONAL_PRODUCT, openFormOptionalProductSaga);
    yield takeEvery(CLOSE_FORM_OPTIONAL_PRODUCT, closeFormOptionalProductSaga);
    yield takeEvery(ADD_OPTIONAL_PRODUCT, addOptionalProductSaga);
    yield takeEvery(UPDATE_OPTIONAL_PRODUCT, updateOptionalProductSaga);
    yield takeEvery(REMOVE_OPTIONAL_PRODUCT, removeOptionalProductSaga);
    yield takeEvery(SEARCH_OPTIONAL_PRODUCT, searchOptionalProductSaga);

}