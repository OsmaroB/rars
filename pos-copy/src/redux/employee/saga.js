import { put, takeEvery } from 'redux-saga/effects';
import {
    getEmployee as getEmployeeAPI,
    addEmployee as addEmployeeAPI,
    updateEmployee as updateEmployeeAPI,
    removeEmployee as removeEmployeeAPI,
} from '../../apis/employee';
import {
    getEmployeeSlice,
    openFormEmployeeSlice,
    closeFormEmployeeSlice,
    addEmployeeSlice,
    updateEmployeeSlice,
    removeEmployeeSlice,
    searchEmployeeSlice
} from './slice';
import {
    GET_EMPLOYEE,
    OPEN_FORM_EMPLOYEE,
    CLOSE_FORM_EMPLOYEE,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    REMOVE_EMPLOYEE,
    SEARCH_EMPLOYEE
} from '../contants';

export function* getEmployeeSaga(){
    const employees = yield getEmployeeAPI();
    yield put(getEmployeeSlice(employees.data));
}
export function* updateEmployeeSaga(action){
    yield updateEmployeeAPI(action.employee);
    const employees = yield getEmployeeAPI();
    const newData = {...action, employees:employees.data};
    yield put(updateEmployeeSlice(newData));
}

export function* addEmployeeSaga(action){
    yield addEmployeeAPI(action.employee);
    const employees = yield getEmployeeAPI();
    const newData = {...action, employees:employees.data};
    yield put(addEmployeeSlice(newData));
}

export function* removeEmployeeSaga(action){
    yield removeEmployeeAPI(action.employee);
    const employees = yield getEmployeeAPI();
    const newData = {...action, employees:employees.data};
    yield put(removeEmployeeSlice(newData));
}

export function* searchEmployeeSaga(action){
    const employees = yield getEmployeeAPI();
    const newData = {...action,employees:employees.data};
    yield put(searchEmployeeSlice(newData));
}

export function* openFormEmployeeSaga(action){ yield put(openFormEmployeeSlice(action)); }
export function* closeFormEmployeeSaga(action){ yield put(closeFormEmployeeSlice(action)); }


export function* employeeSaga(){
    yield takeEvery(GET_EMPLOYEE, getEmployeeSaga);
    yield takeEvery(OPEN_FORM_EMPLOYEE, openFormEmployeeSaga);
    yield takeEvery(CLOSE_FORM_EMPLOYEE, closeFormEmployeeSaga);
    yield takeEvery(ADD_EMPLOYEE, addEmployeeSaga);
    yield takeEvery(UPDATE_EMPLOYEE, updateEmployeeSaga);
    yield takeEvery(REMOVE_EMPLOYEE, removeEmployeeSaga);
    yield takeEvery(SEARCH_EMPLOYEE, searchEmployeeSaga);

}