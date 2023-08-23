import { put, takeEvery } from 'redux-saga/effects';
import {
    getTiketConfiguration as getTiketConfigurationAPI,
    addTiketConfiguration as addTiketConfigurationAPI,
    updateTiketConfiguration as updateTiketConfigurationAPI,
} from '../../apis/tiket-configuration';
import {
    getTiketConfigurationSlice,
    addTiketConfigurationSlice,
    updateTiketConfigurationSlice,
    openFormTiketConfigurationSlice,
    closeFormTiketConfigurationSlice
} from './slice';
import {
    GET_TIKET_CONFIGURATION,
    ADD_TIKET_CONFIGURATION,
    UPDATE_TIKET_CONFIGURATION,
    OPEN_FORM_TIKET_CONFIGURATION,
    CLOSE_FORM_TIKET_CONFIGURATION,
} from '../contants';

export function* getTiketConfigurationSaga(){
    try {
        const configuration = yield getTiketConfigurationAPI();
        yield put(getTiketConfigurationSlice(configuration));
    } catch (error) {
        console.log(error);
    }
}
export function* updateTiketConfigurationSaga(action){
    try {
        yield updateTiketConfigurationAPI(action.configuration);
        const configuration = yield getTiketConfigurationAPI();
        const newData = {...action, configuration:configuration};
        yield put(updateTiketConfigurationSlice(newData));
        
    } catch (error) {
        console.log(error);
    }
}

export function* addTiketConfigurationSaga(action){
    yield addTiketConfigurationAPI(action.configuration);
    const configuration = yield getTiketConfigurationAPI();
    const newData = {...action, configuration:configuration.data};
    yield put(addTiketConfigurationSlice(newData));
}


export function* openFormTiketConfigurationSaga(action){ yield put(openFormTiketConfigurationSlice(action)); }
export function* closeFormTiketConfigurationSaga(action){ yield put(closeFormTiketConfigurationSlice(action)); }


export function* tiketConfigurationSaga(){
    yield takeEvery(GET_TIKET_CONFIGURATION, getTiketConfigurationSaga);
    yield takeEvery(OPEN_FORM_TIKET_CONFIGURATION, openFormTiketConfigurationSaga);
    yield takeEvery(CLOSE_FORM_TIKET_CONFIGURATION, closeFormTiketConfigurationSaga);
    yield takeEvery(ADD_TIKET_CONFIGURATION, addTiketConfigurationSaga);
    yield takeEvery(UPDATE_TIKET_CONFIGURATION, updateTiketConfigurationSaga);

}