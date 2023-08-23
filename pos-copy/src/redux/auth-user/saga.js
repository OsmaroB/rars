import { put, takeEvery } from 'redux-saga/effects';
import postAuthUserAPI from '../../apis/auth';
import {
    postAuthUserSlice, 
    setAuthUserSlice
} from './slice';
import {
    POST_AUTH_USER,
    SET_AUTH_USER
} from '../contants';


export function* postAuthUserSaga(action){
    try {
        const auth = yield postAuthUserAPI(action.authUser);
        const newData = {...action, authUser:auth.data};
        yield put(postAuthUserSlice(newData));
    } catch (error) {
        console.log(error);
    }
}

export function* setAuthUserSaga(action){
    try {
        const newData = {...action, AuthToken:action.token};
        yield put(setAuthUserSlice(newData));
    } catch (error) {
        console.log(error)
    }
};

export function* authUserSaga(){
    yield takeEvery(POST_AUTH_USER, postAuthUserSaga);
    yield takeEvery(SET_AUTH_USER, setAuthUserSaga);
}