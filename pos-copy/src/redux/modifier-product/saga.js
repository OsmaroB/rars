import { put, takeEvery } from 'redux-saga/effects';
import {
    getModifierProducts as getModifierProductAPI,
    addModifierProducts as addModifierProductAPI,
    updateModifierProducts as updateModifierProductAPI,
    removeModifierProducts as removeModifierProductAPI,
} from '../../apis/modifier-products';
import {
    getModifierProductSlice,
    openFormModifierProductSlice,
    closeFormModifierProductSlice,
    addModifierProductSlice,
    updateModifierProductSlice,
    removeModifierProductSlice,
    searchModifierProductSlice,
} from './slice';
import {
    GET_MODIFIER_PRODUCT,
    CLOSE_FORM_MODIFIER_PRODUCT,
    OPEN_FORM_MODIFIER_PRODUCT,
    ADD_MODIFIER_PRODUCT,
    UPDATE_MODIFIER_PRODUCT,
    REMOVE_MODIFIER_PRODUCT,
    SEARCH_MODIFIER_PRODUCT,
} from '../contants';

export function* getModifierProductSaga(){
    try {
        const modifierProducts = yield getModifierProductAPI();
        yield put(getModifierProductSlice(modifierProducts.data));
    } catch (error) {
        console.log(error);
    }
}

export function* updateModifierProductSaga(action){
    const modifierProducts = yield getModifierProductAPI();
    yield updateModifierProductAPI(action.modifierProduct);
    const newData = {...action, modifierProducts:modifierProducts.data};
    yield put(updateModifierProductSlice(newData));
}

export function* addModifierProductSaga(action){
    try {
        yield addModifierProductAPI(action.modifierProduct);
        const modifierProducts = yield getModifierProductAPI();
        const newData = {...action, modifierProducts:modifierProducts.data};
        yield put(addModifierProductSlice(newData));
    } catch (error) {
        console.log(error);
    }
}

export function* removeModifierProductSaga(action){
    yield removeModifierProductAPI(action.modifierProduct);
    const modifierProducts = yield getModifierProductAPI();
    console.log(modifierProducts);
    const newData = {...action, modifierProducts:modifierProducts.data};
    yield put(removeModifierProductSlice(newData));
}

export function* searchModifierProductSaga(action){
    const modifierProducts = yield getModifierProductAPI();
    const newData = {...action,modifierProducts:modifierProducts.data};
    yield put(searchModifierProductSlice(newData));
}

export function* openFormModifierProductSaga(action){ yield put(openFormModifierProductSlice(action)); }
export function* closeFormModifierProductSaga(action){ yield put(closeFormModifierProductSlice(action)); }


export function* modifierProductSaga(){
    yield takeEvery(GET_MODIFIER_PRODUCT, getModifierProductSaga);
    yield takeEvery(OPEN_FORM_MODIFIER_PRODUCT, openFormModifierProductSaga);
    yield takeEvery(CLOSE_FORM_MODIFIER_PRODUCT, closeFormModifierProductSaga);
    yield takeEvery(ADD_MODIFIER_PRODUCT, addModifierProductSaga);
    yield takeEvery(UPDATE_MODIFIER_PRODUCT, updateModifierProductSaga);
    yield takeEvery(REMOVE_MODIFIER_PRODUCT, removeModifierProductSaga);
    yield takeEvery(SEARCH_MODIFIER_PRODUCT, searchModifierProductSaga);
}