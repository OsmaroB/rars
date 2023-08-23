import { put, take, takeEvery } from 'redux-saga/effects';
import {
  getDiscount as getDiscountAPI,
  addDiscount as addDiscountAPI,
  updateDiscount as updateDiscountAPI,
  removeDiscount as removeDiscountAPI,
} from '../../apis/discount';
import {
  getDiscountSlice,
  openFormDiscountSlice,
  closeFormDiscountSlice,
  addDiscountSlice,
  updateDiscountSlice,
  removeDiscountSlice,
  searchDiscountSlice,
  addCurrentCouponDiscountSlice,
} from './slice';
import {
  GET_DISCOUNT,
  CLOSE_FORM_DISCOUNT,
  OPEN_FORM_DISCOUNT,
  ADD_DISCOUNT,
  UPDATE_DISCOUNT,
  REMOVE_DISCOUNT,
  SEARCH_DISCOUNT,
  ADD_COUPON_DISCOUNT,
} from '../contants';

export function* getDiscountSaga() {
  try {
    const discounts = yield getDiscountAPI();
    yield put(getDiscountSlice(discounts.data));
  } catch (error) {
    console.log(error);
  }
}

export function* updateDiscountSaga(action) {
  yield updateDiscountAPI(action.discount);
  const discounts = yield getDiscountAPI();
  const newData = { ...action, discounts: discounts.data };
  yield put(updateDiscountSlice(newData));
}

export function* addDiscountSaga(action) {
  try {
    yield addDiscountAPI(action.discount);
    const discounts = yield getDiscountAPI();
    const newData = { ...action, discounts: discounts.data };
    yield put(addDiscountSlice(newData));
  } catch (error) {
    console.log(error);
  }
}
export function* addCouponDiscountSaga(action) {
  const newData = { ...action, currentCoupon: action };
  yield put(addCurrentCouponDiscountSlice(newData));
}
export function* removeDiscountSaga(action) {
  yield removeDiscountAPI(action.discount);
  const discounts = yield getDiscountAPI();
  const newData = { ...action, discounts: discounts.data };
  yield put(removeDiscountSlice(newData));
}

export function* searchDiscountSaga(action) {
  const discounts = yield getDiscountAPI();
  const newData = { ...action, discounts: discounts.data };
  yield put(searchDiscountSlice(newData));
}

export function* openFormDiscountSaga(action) {
  yield put(openFormDiscountSlice(action));
}
export function* closeFormDiscountSaga(action) {
  yield put(closeFormDiscountSlice(action));
}

export function* discountSaga() {
  yield takeEvery(GET_DISCOUNT, getDiscountSaga);
  yield takeEvery(OPEN_FORM_DISCOUNT, openFormDiscountSaga);
  yield takeEvery(CLOSE_FORM_DISCOUNT, closeFormDiscountSaga);
  yield takeEvery(ADD_DISCOUNT, addDiscountSaga);
  yield takeEvery(UPDATE_DISCOUNT, updateDiscountSaga);
  yield takeEvery(REMOVE_DISCOUNT, removeDiscountSaga);
  yield takeEvery(SEARCH_DISCOUNT, searchDiscountSaga);
  yield takeEvery(ADD_COUPON_DISCOUNT, addCouponDiscountSaga);
}
