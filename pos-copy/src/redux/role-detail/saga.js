import { put, takeEvery } from 'redux-saga/effects';
import {
    getRoleDetail as getRoleDetailAPI,
    addRoleDetail as addRoleDetailAPI,
    updateRoleDetail as updateRoleDetailAPI,
    removeRoleDetail as removeRoleDetailAPI
} from '../../apis/role-detail';
import {
    getRoleDetailSlice,
    openFormRoleDetailSlice,
    closeFormRoleDetailSlice,
    addRoleDetailSlice,
    updateRoleDetailSlice,
    removeRoleDetailSlice,
    searchRoleDetailSlice
} from './slice';
import {
    GET_ROLE_DETAIL,
    OPEN_FORM_ROLE_DETAIL,
    CLOSE_FORM_ROLE_DETAIL,
    ADD_ROLE_DETAIL,
    UPDATE_ROLE_DETAIL,
    REMOVE_ROLE_DETAIL,
    SEARCH_ROLE_DETAIL
} from '../contants';

export function* getRoleDetailSaga(){
    const roleDetails = yield getRoleDetailAPI();
    yield put(getRoleDetailSlice(roleDetails.data));
}
export function* updateRoleDetailSaga(action){
    const roleDetails = yield getRoleDetailAPI();
    yield updateRoleDetailAPI(action.roleDetail);
    const newData = {...action, roleDetails:roleDetails.data};
    yield put(updateRoleDetailSlice(newData));
}

export function* addRoleDetailSaga(action){
    yield addRoleDetailAPI(action.roleDetail);
    const roleDetails = yield getRoleDetailAPI();
    const newData = {...action, roleDetails:roleDetails.data};
    yield put(addRoleDetailSlice(newData));
}

export function* removeRoleDetailSaga(action){
    const roleDetails = yield getRoleDetailAPI();
    yield removeRoleDetailAPI(action.roleDetail);
    const newData = {...action, roleDetails:roleDetails.data};
    yield put(removeRoleDetailSlice(newData));
}

export function* searchRoleDetailSaga(action){
    const roleDetails = yield getRoleDetailAPI();
    const newData = {...action,roleDetails:roleDetails.data};
    yield put(searchRoleDetailSlice(newData));
}

export function* openFormRoleDetailSaga(action){ yield put(openFormRoleDetailSlice(action)); }
export function* closeFormRoleDetailSaga(action){ yield put(closeFormRoleDetailSlice(action)); }


export function* roleDetailSaga(){
    yield takeEvery(GET_ROLE_DETAIL, getRoleDetailSaga);
    yield takeEvery(OPEN_FORM_ROLE_DETAIL, openFormRoleDetailSaga);
    yield takeEvery(CLOSE_FORM_ROLE_DETAIL, closeFormRoleDetailSaga);
    yield takeEvery(ADD_ROLE_DETAIL, addRoleDetailSaga);
    yield takeEvery(UPDATE_ROLE_DETAIL, updateRoleDetailSaga);
    yield takeEvery(REMOVE_ROLE_DETAIL, removeRoleDetailSaga);
    yield takeEvery(SEARCH_ROLE_DETAIL, searchRoleDetailSaga);

}