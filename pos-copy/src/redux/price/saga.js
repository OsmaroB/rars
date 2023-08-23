import { put, takeEvery } from 'redux-saga/effects';
import {
    getPrice as getPriceAPI,
    addPrice as addPriceAPI,
    updatePrice as updatePriceAPI,
    removePrice as removePriceAPI
} from '../../apis/prices'
import {
    getPriceSlice,
    openFormPriceSlice,
    closeFormPriceSlice,
    addPriceSlice,
    updatePriceSlice,
    removePriceSlice,
    searchPriceSlice
} from './slice';
import {
    GET_PRICE,
    CLOSE_FORM_PRICE,
    OPEN_FORM_PRICE,
    ADD_PRICE,
    UPDATE_PRICE,
    REMOVE_PRICE,
    SEARCH_PRICE,
} from '../contants';

export function* getPriceSaga(){
    try {
        const prices = yield getPriceAPI()
        yield put(getPriceSlice({prices:prices}));
    } catch (error) {
        console.log(error)
    }
}
export function* updatePriceSaga(action){
    try {
        const prices = yield getPriceAPI();
        yield updatePriceAPI(action.price);
        const newData = {...action, prices:prices};
        yield put(updatePriceSlice(newData));
    } catch (error) {
        console.log(error);
    }
}

export function* addPriceSaga(action){
    try {
        const price = yield addPriceAPI(action.price);
        console.log(price)
        const prices = yield getPriceAPI();
        const newData = {...action, prices:prices};
        yield put(addPriceSlice(newData));
    } catch (error) {
        console.log(error);
    }
}

export function* removePriceSaga(action){
    try {
        const prices = yield getPriceAPI();
        yield removePriceAPI(action.price);
        const newData = {...action, prices:prices};
        yield put(removePriceSlice(newData));
    } catch (error) {
        console.log(error);
    }
}

export function* searchPriceSaga(action){
    try {
        const prices = yield getPriceAPI();
        const newData = {...action,prices:prices};
        yield put(searchPriceSlice(newData));
    } catch (error) {
        console.log(error);
    } 
}

export function* openFormPriceSaga(action){ yield put(openFormPriceSlice(action)); }
export function* closeFormPriceSaga(action){ yield put(closeFormPriceSlice(action)); }


export function* priceSaga(){
    yield takeEvery(GET_PRICE, getPriceSaga);
    yield takeEvery(OPEN_FORM_PRICE, openFormPriceSaga);
    yield takeEvery(CLOSE_FORM_PRICE, closeFormPriceSaga);
    yield takeEvery(ADD_PRICE, addPriceSaga);
    yield takeEvery(UPDATE_PRICE, updatePriceSaga);
    yield takeEvery(REMOVE_PRICE, removePriceSaga);
    yield takeEvery(SEARCH_PRICE, searchPriceSaga);
}