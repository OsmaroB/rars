import { put, takeEvery } from 'redux-saga/effects';
import {
    getRole as getRoleAPI,
    addRole as addRoleAPI,
    updateRole as updateRoleAPI,
    removeRole as removeRoleAPI
} from '../../apis/role';
import {
    getRoleSlice,
    openFormRoleSlice,
    closeFormRoleSlice,
    addRoleSlice,
    updateRoleSlice,
    removeRoleSlice,
    searchRoleSlice
} from './slice';
import {
    GET_ROLE,
    OPEN_FORM_ROLE,
    CLOSE_FORM_ROLE,
    ADD_ROLE,
    UPDATE_ROLE,
    REMOVE_ROLE,
    SEARCH_ROLE
} from '../contants';

export function* getRoleSaga(){
    const roles = yield getRoleAPI();
    yield put(getRoleSlice(roles.data));
}
export function* updateRoleSaga(action){
    const roles = yield getRoleAPI();
    yield updateRoleAPI(action.role);
    const newData = {...action, roles:roles.data};
    yield put(updateRoleSlice(newData));
}

export function* addRoleSaga(action){
    yield addRoleAPI(action.role);
    const roles = yield getRoleAPI();
    const newData = {...action, roles:roles.data};
    yield put(addRoleSlice(newData));
}

export function* removeRoleSaga(action){
    const roles = yield getRoleAPI();
    yield removeRoleAPI(action.role);
    const newData = {...action, roles:roles.data};
    yield put(removeRoleSlice(newData));
}

export function* searchRoleSaga(action){
    const roles = yield getRoleAPI();
    const newData = {...action,roles:roles.data};
    yield put(searchRoleSlice(newData));
}

export function* openFormRoleSaga(action){ yield put(openFormRoleSlice(action)); }
export function* closeFormRoleSaga(action){ yield put(closeFormRoleSlice(action)); }


export function* roleSaga(){
    yield takeEvery(GET_ROLE, getRoleSaga);
    yield takeEvery(OPEN_FORM_ROLE, openFormRoleSaga);
    yield takeEvery(CLOSE_FORM_ROLE, closeFormRoleSaga);
    yield takeEvery(ADD_ROLE, addRoleSaga);
    yield takeEvery(UPDATE_ROLE, updateRoleSaga);
    yield takeEvery(REMOVE_ROLE, removeRoleSaga);
    yield takeEvery(SEARCH_ROLE, searchRoleSaga);

}