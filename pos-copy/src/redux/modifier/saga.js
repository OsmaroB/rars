import { put, takeEvery } from 'redux-saga/effects';
import {
    getModifier as getModifierAPI,
    addModifier as addModifierAPI,
    updateModifier as updateModifierAPI,
    removeModifier as removeModifierAPI,
} from '../../apis/modifier';
import {
    getModifierSlice,
    openFormModifierSlice,
    closeFormModifierSlice,
    addModifierSlice,
    updateModifierSlice,
    removeModifierSlice,
    searchModifierSlice
} from './slice';


import {
    GET_MODIFIER,
    CLOSE_FORM_MODIFIER,
    OPEN_FORM_MODIFIER,
    ADD_MODIFIER,
    UPDATE_MODIFIER,
    REMOVE_MODIFIER,
    SEARCH_MODIFIER
} from '../contants';

export function* getModifierSaga(){
    const modifiers = yield getModifierAPI();
    yield put(getModifierSlice(modifiers.data));
}

export function* updateModifierSaga(action){
    const modifiers = yield getModifierAPI();
    yield updateModifierAPI(action.modifier);
    const newData = {...action, modifiers:modifiers.data};
    yield put(updateModifierSlice(newData));
}

export function* addModifierSaga(action){
    yield addModifierAPI(action.modifier);
    const modifiers = yield getModifierAPI();
    const newData = {...action, modifiers:modifiers.data};
    yield put(addModifierSlice(newData));
}

export function* removeModifierSaga(action){
    const modifiers = yield getModifierAPI();
    yield removeModifierAPI(action.modifier);
    const newData = {...action, modifiers:modifiers.data};
    yield put(removeModifierSlice(newData));
}

export function* searchModifierSaga(action){
    const modifiers = yield getModifierAPI();
    const newData = {...action,modifiers:modifiers.data};
    yield put(searchModifierSlice(newData));
}

export function* openFormModifierSaga(action){ yield put(openFormModifierSlice(action)); }
export function* closeFormModifierSaga(action){ yield put(closeFormModifierSlice(action)); }


export function* modifierSaga(){
    yield takeEvery(GET_MODIFIER, getModifierSaga);
    yield takeEvery(OPEN_FORM_MODIFIER, openFormModifierSaga);
    yield takeEvery(CLOSE_FORM_MODIFIER, closeFormModifierSaga);
    yield takeEvery(ADD_MODIFIER, addModifierSaga);
    yield takeEvery(UPDATE_MODIFIER, updateModifierSaga);
    yield takeEvery(REMOVE_MODIFIER, removeModifierSaga);
    yield takeEvery(SEARCH_MODIFIER, searchModifierSaga);
}