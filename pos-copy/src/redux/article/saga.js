import { put, takeEvery } from 'redux-saga/effects';
import {
    getArticle as getArticleAPI,
    addArticle as addArticleAPI,
    updateArticle as updateArticleAPI,
    removeArticle as removeArticleAPI,
} from '../../apis/article';
import {
    getArticleSlice,
    openFormArticleSlice,
    closeFormArticleSlice,
    addArticleSlice,
    updateArticleSlice,
    removeArticleSlice,
    searchArticleSlice,
} from './slice';
import {
    GET_ARTICLE,
    OPEN_FORM_ARTICLE,
    CLOSE_FORM_ARTICLE,
    ADD_ARTICLE,
    UPDATE_ARTICLE, 
    REMOVE_ARTICLE,
    SEARCH_ARTICLE,
} from '../contants';

export function* getArticleSaga(){
    try {
        const articles = yield getArticleAPI();
        yield put(getArticleSlice(articles.data));
    } catch (error) {
        console.log(error);
    }
}
export function* updateArticleSaga(action){
    const articles = yield getArticleAPI();
    yield updateArticleAPI(action.article);
    const newData = {...action, articles:articles.data};
    yield put(updateArticleSlice(newData));
}

export function* addArticleSaga(action){
    yield addArticleAPI(action.article);
    const articles = yield getArticleAPI();
    const newData = {...action, articles:articles.data};
    yield put(addArticleSlice(newData));
}

export function* removeArticleSaga(action){
    const articles = yield getArticleAPI();
    yield removeArticleAPI(action.article);
    const newData = {...action, articles:articles.data};
    yield put(removeArticleSlice(newData));
}

export function* searchArticleSaga(action){
    const articles = yield getArticleAPI();
    const newData = {...action,articles:articles.data};
    yield put(searchArticleSlice(newData));
}

export function* openFormArticleSaga(action){ yield put(openFormArticleSlice(action)); }
export function* closeFormArticleSaga(action){ yield put(closeFormArticleSlice(action)); }


export function* articleSaga(){
    yield takeEvery(GET_ARTICLE, getArticleSaga);
    yield takeEvery(OPEN_FORM_ARTICLE, openFormArticleSaga);
    yield takeEvery(CLOSE_FORM_ARTICLE, closeFormArticleSaga);
    yield takeEvery(ADD_ARTICLE, addArticleSaga);
    yield takeEvery(UPDATE_ARTICLE, updateArticleSaga);
    yield takeEvery(REMOVE_ARTICLE, removeArticleSaga);
    yield takeEvery(SEARCH_ARTICLE, searchArticleSaga);

}