import { put, takeEvery } from 'redux-saga/effects';
import {
    getCategoryButton as getCategoryButtonAPI,
    addCategoryButton as addCategoryButtonAPI,
    updateCategoryButton as updateCategoryButtonAPI,
    removeCategoryButton as removeCategoryButtonAPI,
} from '../../apis/category-button';
import {
    getCategoryButtonSlice,
    openFormCategoryButtonSlice,
    closeFormCategoryButtonSlice,
    addCategoryButtonSlice,
    updateCategoryButtonSlice,
    removeCategoryButtonSlice,
    searchCategoryButtonSlice,
} from './slice';
import {
    GET_CATEGORY_BUTTON,
    CLOSE_FORM_CATEGORY_BUTTON,
    OPEN_FORM_CATEGORY_BUTTON,
    ADD_CATEGORY_BUTTON,
    UPDATE_CATEGORY_BUTTON,
    REMOVE_CATEGORY_BUTTON,
    SEARCH_CATEGORY_BUTTON,
} from '../contants';

export function* getCategoryButtonSaga(){
    try {
        const categoryButtons = yield getCategoryButtonAPI();
        yield put(getCategoryButtonSlice(categoryButtons.data));
    } catch (error) {
        console.log(error);
    }
}
export function* updateCategoryButtonSaga(action){
    const categoryButtons = yield getCategoryButtonAPI();
    console.log(action.categoryButton)
    yield updateCategoryButtonAPI(action.categoryButton);
    const newData = {...action, categoryButtons:categoryButtons.data};
    yield put(updateCategoryButtonSlice(newData));
}

export function* addCategoryButtonSaga(action){
    yield addCategoryButtonAPI(action.categoryButton);
    const categoryButtons = yield getCategoryButtonAPI();
    const newData = {...action, categoryButtons:categoryButtons.data};
    yield put(addCategoryButtonSlice(newData));
}

export function* removeCategoryButtonSaga(action){
    const categoryButtons = yield getCategoryButtonAPI();
    yield removeCategoryButtonAPI(action.categoryButton);
    const newData = {...action, categoryButtons:categoryButtons.data};
    yield put(removeCategoryButtonSlice(newData));
}

export function* searchCategoryButtonSaga(action){
    const categoryButtons = yield getCategoryButtonAPI();
    const newData = {...action,categoryButtons:categoryButtons.data};
    yield put(searchCategoryButtonSlice(newData));
}

export function* openFormCategoryButtonSaga(action){ yield put(openFormCategoryButtonSlice(action)); }
export function* closeFormCategoryButtonSaga(action){ yield put(closeFormCategoryButtonSlice(action)); }


export function* categoryButtonSaga(){
    yield takeEvery(GET_CATEGORY_BUTTON, getCategoryButtonSaga);
    yield takeEvery(OPEN_FORM_CATEGORY_BUTTON, openFormCategoryButtonSaga);
    yield takeEvery(CLOSE_FORM_CATEGORY_BUTTON, closeFormCategoryButtonSaga);
    yield takeEvery(ADD_CATEGORY_BUTTON, addCategoryButtonSaga);
    yield takeEvery(UPDATE_CATEGORY_BUTTON, updateCategoryButtonSaga);
    yield takeEvery(REMOVE_CATEGORY_BUTTON, removeCategoryButtonSaga);
    yield takeEvery(SEARCH_CATEGORY_BUTTON, searchCategoryButtonSaga);
}