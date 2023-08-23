import { put, takeEvery } from 'redux-saga/effects';
import {
    getRecipeArticle as getRecipeArticleAPI,
    addRecipeArticle as addRecipeArticleAPI,
    updateRecipeArticle as updateRecipeArticleAPI,
    removeRecipeArticle as removeRecipeArticleAPI,
} from '../../apis/recipe-article';
import {
    getRecipeArticleSlice,
    openFormRecipeArticleSlice,
    closeFormRecipeArticleSlice,
    addRecipeArticleSlice,
    updateRecipeArticleSlice,
    removeRecipeArticleSlice,
    searchRecipeArticleSlice,
} from './slice';
import {
    GET_RECIPE_ARTICLE,
    CLOSE_FORM_RECIPE_ARTICLE,
    OPEN_FORM_RECIPE_ARTICLE,
    ADD_RECIPE_ARTICLE,
    UPDATE_RECIPE_ARTICLE,
    REMOVE_RECIPE_ARTICLE,
    SEARCH_RECIPE_ARTICLE,
} from '../contants';

export function* getRecipeArticleSaga(){
    const recipeArticles = yield getRecipeArticleAPI();
    yield put(getRecipeArticleSlice(recipeArticles.data));
}
export function* updateRecipeArticleSaga(action){
    const recipeArticles = yield getRecipeArticleAPI();
    yield updateRecipeArticleAPI(action.recipeArticle);
    const newData = {...action, recipeArticles:recipeArticles.data};
    yield put(updateRecipeArticleSlice(newData));
}

export function* addRecipeArticleSaga(action){
    yield addRecipeArticleAPI(action.recipeArticle);
    const recipeArticles = yield getRecipeArticleAPI();
    const newData = {...action, recipeArticles:recipeArticles.data};
    yield put(addRecipeArticleSlice(newData));
}

export function* removeRecipeArticleSaga(action){
    const recipeArticles = yield getRecipeArticleAPI();
    yield removeRecipeArticleAPI(action.recipeArticle);
    const newData = {...action, recipeArticles:recipeArticles.data};
    yield put(removeRecipeArticleSlice(newData));
}

export function* searchRecipeArticleSaga(action){
    const recipeArticles = yield getRecipeArticleAPI();
    const newData = {...action,recipeArticles:recipeArticles.data};
    yield put(searchRecipeArticleSlice(newData));
}

export function* openFormRecipeArticleSaga(action){ yield put(openFormRecipeArticleSlice(action)); }
export function* closeFormRecipeArticleSaga(action){ yield put(closeFormRecipeArticleSlice(action)); }


export function* recipeArticleSaga(){
    yield takeEvery(GET_RECIPE_ARTICLE, getRecipeArticleSaga);
    yield takeEvery(OPEN_FORM_RECIPE_ARTICLE, openFormRecipeArticleSaga);
    yield takeEvery(CLOSE_FORM_RECIPE_ARTICLE, closeFormRecipeArticleSaga);
    yield takeEvery(ADD_RECIPE_ARTICLE, addRecipeArticleSaga);
    yield takeEvery(UPDATE_RECIPE_ARTICLE, updateRecipeArticleSaga);
    yield takeEvery(REMOVE_RECIPE_ARTICLE, removeRecipeArticleSaga);
    yield takeEvery(SEARCH_RECIPE_ARTICLE, searchRecipeArticleSaga);
}