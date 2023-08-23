import { put, takeEvery } from 'redux-saga/effects';
import {
    getRecipe as getRecipeAPI,
    addRecipe as addRecipeAPI,
    updateRecipe as updateRecipeAPI,
    removeRecipe as removeRecipeAPI,
} from '../../apis/recipe';
import {
    getRecipeSlice,
    openFormRecipeSlice,
    closeFormRecipeSlice,
    addRecipeSlice,
    updateRecipeSlice,
    removeRecipeSlice,
    searchRecipeSlice,
} from './slice';
import {
    GET_RECIPE,
    CLOSE_FORM_RECIPE,
    OPEN_FORM_RECIPE,
    ADD_RECIPE,
    UPDATE_RECIPE,
    REMOVE_RECIPE,
    SEARCH_RECIPE
} from '../contants';

export function* getRecipeSaga(){
    const recipes = yield getRecipeAPI();
    yield put(getRecipeSlice(recipes.data));
}
export function* updateRecipeSaga(action){
    const recipes = yield getRecipeAPI();
    yield updateRecipeAPI(action.recipe);
    const newData = {...action, recipes:recipes.data};
    yield put(updateRecipeSlice(newData));
}

export function* addRecipeSaga(action){
    yield addRecipeAPI(action.recipe);
    const recipes = yield getRecipeAPI();
    const newData = {...action, recipes:recipes.data};
    yield put(addRecipeSlice(newData));
}

export function* removeRecipeSaga(action){
    const recipes = yield getRecipeAPI();
    yield removeRecipeAPI(action.recipe);
    const newData = {...action, recipes:recipes.data};
    yield put(removeRecipeSlice(newData));
}

export function* searchRecipeSaga(action){
    const recipes = yield getRecipeAPI();
    const newData = {...action,recipes:recipes.data};
    yield put(searchRecipeSlice(newData));
}

export function* openFormRecipeSaga(action){ yield put(openFormRecipeSlice(action)); }
export function* closeFormRecipeSaga(action){ yield put(closeFormRecipeSlice(action)); }


export function* recipeSaga(){
    yield takeEvery(GET_RECIPE, getRecipeSaga);
    yield takeEvery(OPEN_FORM_RECIPE, openFormRecipeSaga);
    yield takeEvery(CLOSE_FORM_RECIPE, closeFormRecipeSaga);
    yield takeEvery(ADD_RECIPE, addRecipeSaga);
    yield takeEvery(UPDATE_RECIPE, updateRecipeSaga);
    yield takeEvery(REMOVE_RECIPE, removeRecipeSaga);
    yield takeEvery(SEARCH_RECIPE, searchRecipeSaga);
}