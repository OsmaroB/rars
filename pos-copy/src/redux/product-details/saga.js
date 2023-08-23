import { put, takeEvery } from 'redux-saga/effects';
import {
    getProductDetail as getProductDetailAPI,
    addProductDetail as addProductDetailAPI,
    updateProductDetail as updateProductDetailAPI,
    removeProductDetail as removeProductDetailAPI,
} from '../../apis/product-detail';
import {
    getProductDetailSlice,
    openFormProductDetailSlice,
    closeFormProductDetailSlice,
    addProductDetailSlice,
    updateProductDetailSlice,
    removeProductDetailSlice,
    searchProductDetailSlice,
} from './slice';
import {
    GET_PRODUCT_DETAIL,
    CLOSE_FORM_PRODUCT_DETAIL,
    OPEN_FORM_PRODUCT_DETAIL,
    ADD_PRODUCT_DETAIL,
    UPDATE_PRODUCT_DETAIL,
    REMOVE_PRODUCT_DETAIL,
    SEARCH_PRODUCT_DETAIL,
} from '../contants';

export function* getProductDetailSaga(){
    const productDetails = yield getProductDetailAPI();
    yield put(getProductDetailSlice(productDetails.data));
}
export function* updateProductDetailSaga(action){
    const productDetails = yield getProductDetailAPI();
    yield updateProductDetailAPI(action.productDetail);
    const newData = {...action, productDetails:productDetails.data};
    yield put(updateProductDetailSlice(newData));
}

export function* addProductDetailSaga(action){
    yield addProductDetailAPI(action.productDetail);
    const productDetails = yield getProductDetailAPI();
    const newData = {...action, productDetails:productDetails.data};
    yield put(addProductDetailSlice(newData));
}

export function* removeProductDetailSaga(action){
    const productDetails = yield getProductDetailAPI();
    yield removeProductDetailAPI(action.productDetail);
    const newData = {...action, productDetails:productDetails.data};
    yield put(removeProductDetailSlice(newData));
}

export function* searchProductDetailSaga(action){
    const productDetails = yield getProductDetailAPI();
    const newData = {...action,productDetails:productDetails.data};
    yield put(searchProductDetailSlice(newData));
}

export function* openFormProductDetailSaga(action){ yield put(openFormProductDetailSlice(action)); }
export function* closeFormProductDetailSaga(action){ yield put(closeFormProductDetailSlice(action)); }


export function* productDetailSaga(){
    yield takeEvery(GET_PRODUCT_DETAIL, getProductDetailSaga);
    yield takeEvery(OPEN_FORM_PRODUCT_DETAIL, openFormProductDetailSaga);
    yield takeEvery(CLOSE_FORM_PRODUCT_DETAIL, closeFormProductDetailSaga);
    yield takeEvery(ADD_PRODUCT_DETAIL, addProductDetailSaga);
    yield takeEvery(UPDATE_PRODUCT_DETAIL, updateProductDetailSaga);
    yield takeEvery(REMOVE_PRODUCT_DETAIL, removeProductDetailSaga);
    yield takeEvery(SEARCH_PRODUCT_DETAIL, searchProductDetailSaga);
}