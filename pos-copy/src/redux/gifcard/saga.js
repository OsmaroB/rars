import { put, takeEvery } from 'redux-saga/effects';
import {
    getGiftcard as getGiftcardAPI,
    addGiftcard as addGiftcardAPI,
    updateGiftcard as updateGiftcardAPI,
} from '../../apis';
import {
    getGiftcardSlice,
    openFormGiftcardSlice,
    closeFormGiftcardSlice,
    addGiftcardSlice,
    updateGiftcardSlice,
    removeGiftcardSlice,
    searchGiftcardSlice,
} from './slice';
import {
    GET_GIFTCARD,
    CLOSE_FORM_GIFTCARD,
    OPEN_FORM_GIFTCARD,
    ADD_GIFTCARD,
    UPDATE_GIFTCARD,
    REMOVE_GIFTCARD,
    SEARCH_GIFTCARD
} from '../contants';

export function* getGiftcardSaga(){
    const giftcards = yield getGiftcardAPI();
    yield put(getGiftcardSlice(giftcards.data));
}
export function* updateGiftcardSaga(action){
    yield updateGiftcardAPI(action.giftcard);
    const giftcards = yield getGiftcardAPI();
    const newData = {...action, giftcards:giftcards.data};
    yield put(updateGiftcardSlice(newData));
}

export function* addGiftcardSaga(action){
    yield addGiftcardAPI(action.giftcard);
    const giftcards = yield getGiftcardAPI();
    const newData = {...action, giftcards:giftcards.data};
    yield put(addGiftcardSlice(newData));
}

export function* removeGiftcardSaga(action){
    yield updateGiftcardAPI(action.giftcard);
    const giftcards = yield getGiftcardAPI();
    const newData = {...action, giftcards:giftcards.data};
    yield put(removeGiftcardSlice(newData));
}

export function* searchGiftcardSaga(action){
    const giftcards = yield getGiftcardAPI();
    const newData = {...action,giftcards:giftcards.data};
    yield put(searchGiftcardSlice(newData));
}

export function* openFormGiftcardSaga(action){ yield put(openFormGiftcardSlice(action)); }
export function* closeFormGiftcardSaga(action){ yield put(closeFormGiftcardSlice(action)); }


export function* giftcardSaga(){
    yield takeEvery(GET_GIFTCARD, getGiftcardSaga);
    yield takeEvery(OPEN_FORM_GIFTCARD, openFormGiftcardSaga);
    yield takeEvery(CLOSE_FORM_GIFTCARD, closeFormGiftcardSaga);
    yield takeEvery(ADD_GIFTCARD, addGiftcardSaga);
    yield takeEvery(UPDATE_GIFTCARD, updateGiftcardSaga);
    yield takeEvery(REMOVE_GIFTCARD, removeGiftcardSaga);
    yield takeEvery(SEARCH_GIFTCARD, searchGiftcardSaga);
}