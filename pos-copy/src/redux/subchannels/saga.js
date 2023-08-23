import { put, takeEvery } from 'redux-saga/effects';
import {
    getSubchannel as getSubChannelAPI,
    addSubchannel as addSubChannelAPI,
    updateSubchannel as updateSubChannelAPI,
    removeSubchannel as removeSubchannelAPI
} from '../../apis/subchannel';
import { 
    getSubChannelSlice,
    openFormSubChannelSlice,
    addSubChannelSlice,
    closeFormSubChannelSlice,
    updateSubChannelSlice,
    removeSubChannelSlice,
    searchSubChannelSlice,
} from './slice';
import { 
    GET_SUBCHANNEL,
    ADD_SUBCHANNEL,
    OPEN_FORM_SUBCHANNEL,
    CLOSE_FORM_SUBCHANNEL,
    UPDATE_SUBCHANNEL,
    REMOVE_SUBCHANNEL,
    SEARCH_SUBCHANNEL,
} from '../contants';

export function* getSubChannelSaga(){
    try {
        const subchannels = yield getSubChannelAPI();
        yield put(getSubChannelSlice(subchannels.data));
    } catch (error) {
        console.log(error);
    }
}

export function* updateSubChannelSaga(action){
    yield updateSubChannelAPI(action.subchannel);
    const subchannels = yield getSubChannelAPI();
    const newData = {...action, subchannels:subchannels.data};
    yield put(updateSubChannelSlice(newData));
}

export function* addSubChannelSaga(action){
    yield addSubChannelAPI(action.subchannel);
    const subchannels = yield getSubChannelAPI();
    const newData = {...action, subchannels:subchannels.data};
    yield put(addSubChannelSlice(newData));
}

export function* removeSubChannelSaga(action){
    yield removeSubchannelAPI(action.subchannel);
    const subchannels = yield getSubChannelAPI();
    const newData = {...action, subchannels:subchannels.data};
    yield put(removeSubChannelSlice(newData));
}

export function* searchSubChannelSaga(action){
    const subchannels = yield getSubChannelAPI();
    const newData = {...action,subchannels:subchannels.data};
    yield put(searchSubChannelSlice(newData));
}

export function* openFormSubChannelSaga(action){ yield put(openFormSubChannelSlice(action)); }
export function* closeFormSubChannelSaga(action){ yield put(closeFormSubChannelSlice(action)); }


export function* subChannelSaga(){
    yield takeEvery(GET_SUBCHANNEL, getSubChannelSaga);
    yield takeEvery(ADD_SUBCHANNEL, addSubChannelSaga);
    yield takeEvery(OPEN_FORM_SUBCHANNEL, openFormSubChannelSaga);
    yield takeEvery(CLOSE_FORM_SUBCHANNEL, closeFormSubChannelSaga);
    yield takeEvery(UPDATE_SUBCHANNEL, updateSubChannelSaga);
    yield takeEvery(REMOVE_SUBCHANNEL, removeSubChannelSaga);
    yield takeEvery(SEARCH_SUBCHANNEL, searchSubChannelSaga);
}