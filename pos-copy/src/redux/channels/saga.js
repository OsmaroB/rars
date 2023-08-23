import { put, takeEvery } from 'redux-saga/effects';
import {
    getChannel as getChannelAPI,
    addChannel as addChannelAPI,
    updateChannel as updateChannelAPI,
    removeChannel as removeChannelAPI,
} from '../../apis/channel';
import { 
    getChannelSlice,
    OpenFormChannelSlice,
    closeFormChannelSlice,
    addChannelSlice,
    updateChannelSlice,
    removeChannelSlice,
    searchChannelSlice
} from './slice';
import { 
    GET_CHANNEL,
    ADD_CHANNEL,
    OPEN_FORM_CHANNEL,
    CLOSE_FORM_CHANNEL,
    UPDATE_CHANNEL,
    REMOVE_CHANNEL,
    SEARCH_CHANNEL
} from '../contants';

export function* getChannelSaga(){
    try {
        const channels = yield getChannelAPI();
        yield put(getChannelSlice(channels.data));
    } catch (error) {
        console.log(error);
    }
}

export function* updateChannelSaga(action){
    yield updateChannelAPI(action.channel);
    const channels = yield getChannelAPI();
    const newData = {...action, channels:channels.data};
    yield put(updateChannelSlice(newData));
}

export function* addChannelSaga(action){
    yield addChannelAPI(action.channel);
    const channels = yield getChannelAPI();
    const newData = {...action, channels:channels.data};
    yield put(addChannelSlice(newData));
}

export function* removeChannelSaga(action){
    yield removeChannelAPI(action.channel);
    const channels = yield getChannelAPI();    
    const newData = {...action, channels:channels.data};
    yield put(removeChannelSlice(newData));
}

export function* searchChannelSaga(action){
    const channels = yield getChannelAPI();
    const newData = {...action,channels:channels.data};
    yield put(searchChannelSlice(newData));
}

export function* openFormChannelSaga(action){ yield put(OpenFormChannelSlice(action)); }
export function* closeFormChannelSaga(action){ yield put(closeFormChannelSlice(action)); }


export function* channelSaga(){
    yield takeEvery(GET_CHANNEL, getChannelSaga);
    yield takeEvery(ADD_CHANNEL, addChannelSaga);
    yield takeEvery(OPEN_FORM_CHANNEL, openFormChannelSaga);
    yield takeEvery(CLOSE_FORM_CHANNEL, closeFormChannelSaga);
    yield takeEvery(UPDATE_CHANNEL, updateChannelSaga);
    yield takeEvery(REMOVE_CHANNEL, removeChannelSaga);
    yield takeEvery(SEARCH_CHANNEL, searchChannelSaga);

}