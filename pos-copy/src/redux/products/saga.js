import { put, takeEvery } from 'redux-saga/effects';
import {
    getProduct as getProductAPI,
    addProduct as addProductAPI,
    updateProduct as updateProductAPI,
    removeProduct as removeProductAPI,
} from '../../apis/product';
import {
    getProductSlice,
    openFormProductSlice,
    closeFormProductSlice,
    addProductSlice,
    updateProductSlice,
    removeProductSlice,
    searchProductSlice
} from './slice';
import {
    GET_PRODUCT,
    CLOSE_FORM_PRODUCT,
    OPEN_FORM_PRODUCT,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    REMOVE_PRODUCT,
    SEARCH_PRODUCT,
} from '../contants';

export function* getProductSaga(){
    const products = yield getProductAPI();
    yield put(getProductSlice(products.data));
}
export function* updateProductSaga(action){
    const products = yield getProductAPI();
    yield updateProductAPI(action.product);
    const newData = {...action, products:products.data};
    yield put(updateProductSlice(newData));
}

export function* addProductSaga(action){
    yield addProductAPI(action.product);
    const products = yield getProductAPI();
    const newData = {...action, products:products.data};
    yield put(addProductSlice(newData));
}

export function* removeProductSaga(action){
    const products = yield getProductAPI();
    yield removeProductAPI(action.product);
    const newData = {...action, products:products.data};
    yield put(removeProductSlice(newData));
}

export function* searchProductSaga(action){
    const products = yield getProductAPI();
    const newData = {...action,products:products.data};
    yield put(searchProductSlice(newData));
}

export function* openFormProductSaga(action){ yield put(openFormProductSlice(action)); }
export function* closeFormProductSaga(action){ yield put(closeFormProductSlice(action)); }


export function* productSaga(){
    yield takeEvery(GET_PRODUCT, getProductSaga);
    yield takeEvery(OPEN_FORM_PRODUCT, openFormProductSaga);
    yield takeEvery(CLOSE_FORM_PRODUCT, closeFormProductSaga);
    yield takeEvery(ADD_PRODUCT, addProductSaga);
    yield takeEvery(UPDATE_PRODUCT, updateProductSaga);
    yield takeEvery(REMOVE_PRODUCT, removeProductSaga);
    yield takeEvery(SEARCH_PRODUCT, searchProductSaga);
}