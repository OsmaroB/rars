import { put, takeEvery } from 'redux-saga/effects';
import {
    getBrand as getBrandAPI,
} from '../../apis';
import {
    getBrandSlice,
} from './slice';
import {
    GET_BRAND,
} from '../contants';

export function* getBrandSaga(){
    const brands = yield getBrandAPI();
    yield put(getBrandSlice(brands.data));
}
export function* brandSaga(){
    yield takeEvery(GET_BRAND, getBrandSaga);
}