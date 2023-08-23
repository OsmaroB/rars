import { put, takeEvery } from 'redux-saga/effects';
import {
    getSubcategory as getSubCategoryAPI,
    addSubcategory as addSubCategoryAPI,
    updateSubcategory as updateSubCategoryAPI,
    removeSubcategory as removeSubcategoryAPI,
} from '../../apis/subcategory';
import {
    getSubCategorySlice, 
    addSubCategorySlice,
    OpenFormSubcategorySlice,
    closeFormSubCategorySlice,
    updateSubCategorySlice,
    removeSubCategorySlice,
    searchSubCategorySlice
} from './slice';
import {
    GET_SUBCATEGORY, 
    ADD_SUBCATEGORY,
    OPEN_FORM_SUBCATEGORY,
    CLOSE_FORM_SUBCATEGORY,
    UPDATE_SUBCATEGORY,
    REMOVE_SUBCATEGORY,
    SEARCH_SUBCATEGORY
} from '../contants';

export function* getSubCategorySaga(){
    try {
        const subcategories = yield getSubCategoryAPI();
        yield put(getSubCategorySlice(subcategories.data));
    } catch (error) {
        console.log(error);
    }
}

export function* updateSubCategorySaga(action){
    yield updateSubCategoryAPI(action.subcategory);
    const subcategories = yield getSubCategoryAPI();
    const newData = {...action, subcategories:subcategories.data};
    yield put(updateSubCategorySlice(newData));
}

export function* addSubCategorySaga(action){
    yield addSubCategoryAPI(action.subcategory);
    const subcategories = yield getSubCategoryAPI();
    const newData = {...action, subcategories:subcategories.data};
    yield put(addSubCategorySlice(newData));
}

export function* removeSubCategorySaga(action){
    yield removeSubcategoryAPI(action.subcategory);
    const subcategories = yield getSubCategoryAPI();    
    const newData = {...action, subcategories:subcategories.data};
    yield put(removeSubCategorySlice(newData));
}

export function* searchSubCategorySaga(action){
    const subcategories = yield getSubCategoryAPI();
    const newData = {...action,subcategories:subcategories.data};
    yield put(searchSubCategorySlice(newData));
}

export function* openFormSubCategorySaga(action){ yield put(OpenFormSubcategorySlice(action)); }
export function* closeFormSubCategorySaga(action){ yield put(closeFormSubCategorySlice(action)); }


export function* subCategorySaga(){
    yield takeEvery(GET_SUBCATEGORY, getSubCategorySaga);
    yield takeEvery(ADD_SUBCATEGORY, addSubCategorySaga);
    yield takeEvery(OPEN_FORM_SUBCATEGORY, openFormSubCategorySaga);
    yield takeEvery(CLOSE_FORM_SUBCATEGORY, closeFormSubCategorySaga);
    yield takeEvery(UPDATE_SUBCATEGORY, updateSubCategorySaga);
    yield takeEvery(REMOVE_SUBCATEGORY, removeSubCategorySaga);
    yield takeEvery(SEARCH_SUBCATEGORY, searchSubCategorySaga);
}