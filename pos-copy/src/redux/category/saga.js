import { put, takeEvery } from 'redux-saga/effects';
import {
  getCategory as getCategoryAPI,
  updateCategory as updateCategoryAPI,
  addCategory as addCategoryAPI,
  removeCategory as removeCategoryAPI,
} from '../../apis/category';
import {
  getCategorySlice,
  updateCategorySlice,
  addCategorySlice,
  addBoolSlice,
  closeFormCategorySlice,
  removeCategorySlice,
  searchCategorySlice,
} from './slice';
import {
  GET_CATEGORY,
  UPDATE_CATEGORY,
  ADD_CATEGORY,
  ADD_BOOL,
  CLOSE_FORM_CATEGORY,
  REMOVE_CATEGORY,
  SEARCH_CATEGORY,
} from '../contants';

export function* getCategorySaga() {
  try {
    const categories = yield getCategoryAPI();
    yield put(getCategorySlice(categories.data));
  } catch (error) {
    console.log(error);
  }
}

export function* updateCategorySaga(action) {
  const categories = yield getCategoryAPI();
  yield updateCategoryAPI(action.category);
  const newData = { ...action, categories: categories.data };
  yield put(updateCategorySlice(newData));
}

export function* addCategorySaga(action) {
  yield addCategoryAPI(action.category);
  const categories = yield getCategoryAPI();
  const newData = { ...action, categories: categories.data };
  yield put(addCategorySlice(newData));
}

export function* removeCategorySaga(action) {
  const categories = yield getCategoryAPI();
  yield removeCategoryAPI(action.category);
  const newData = { ...action, categories: categories.data };
  console.log(newData);
  yield put(removeCategorySlice(newData));
}

export function* searchCategorySaga(action) {
  const categories = yield getCategoryAPI();
  const newData = { ...action, categories: categories.data };
  yield put(searchCategorySlice(newData));
}

export function* addBoolSaga(action) {
  yield put(addBoolSlice(action));
}
export function* closeFormCategorySaga(action) {
  yield put(closeFormCategorySlice(action));
}

export function* categorySaga() {
  yield takeEvery(GET_CATEGORY, getCategorySaga);
  yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
  yield takeEvery(ADD_CATEGORY, addCategorySaga);
  yield takeEvery(ADD_BOOL, addBoolSaga);
  yield takeEvery(CLOSE_FORM_CATEGORY, closeFormCategorySaga);
  yield takeEvery(REMOVE_CATEGORY, removeCategorySaga);
  yield takeEvery(SEARCH_CATEGORY, searchCategorySaga);
}
