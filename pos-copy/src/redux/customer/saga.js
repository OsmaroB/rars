import { put, takeEvery } from 'redux-saga/effects';
import {
    getCustomer as getCustomerAPI,
    addCustomer as addCustomerAPI,
    updateCustomer as updateCustomerAPI,
    removeCustomer as removeCustomerAPI,
    customerRepeat as customerRepeatAPI,
    customerEmailRepeat as customerEmailRepeatAPI,
} from '../../apis/customer';
import { successMessage, warningMessage } from 'helpers/messages';
import {
    getCustomerSlice,
    openFormCustomerSlice,
    closeFormCustomerSlice,
    addCustomerSlice,
    updateCustomerSlice,
    removeCustomerSlice,
    searchCustomerSlice,
    getAllCustomerSlice,
    setCustomerSlice,
} from './slice';
import {
    GET_CUSTOMER,
    CLOSE_FORM_CUSTOMER,
    OPEN_FORM_CUSTOMER,
    ADD_CUSTOMER,
    UPDATE_CUSTOMER,
    REMOVE_CUSTOMER,
    SEARCH_CUSTOMER,
    GET_ALL_CUSTOMER,
    SET_CUSTOMER
} from '../contants';

export function* getCustomerSaga(){
    try {
        const customers = yield getCustomerAPI();
        yield put(getCustomerSlice(customers.data));
    } catch (error) {
        console.log(error);
    }
}

export function* updateCustomerSaga(action){
    try {
        const test = yield customerRepeatAPI(action.customer);
        const testEmail = yield customerEmailRepeatAPI(action.customer);
        const errors = [];
        if(test.status){
            errors.push(test.message);
        }
        if(testEmail.status){
            errors.push(testEmail.message);
        }
        if(errors.length>0){
            errors.map((messeage)=>{
                warningMessage('',messeage)
            })
        }
        if(!test.status && !testEmail.status){
            yield updateCustomerAPI(action.customer);
            const customers = yield getCustomerAPI();
            const newData = {...action, customers:customers.data};
            yield put(updateCustomerSlice(newData));
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
        }
    } catch (error) {
        
    }
}

export function* addCustomerSaga(action){
    try {
        const test = yield customerRepeatAPI(action.customer);
        const testEmail = yield customerEmailRepeatAPI(action.customer);
        const errors = [];
        if(test.status){
            errors.push(test.message);
        }
        if(testEmail.status){
            errors.push(testEmail.message);
        }
        if(errors.length>0){
            errors.map((messeage)=>{
                warningMessage('',messeage)
            })
        }
        if(!test.status && !testEmail.status){
            const customer = yield addCustomerAPI(action.customer);
            const customers = yield getCustomerAPI();
            const newData = {...action, customers:customers.data, customer:customer};
            yield put(addCustomerSlice(newData));
            successMessage('Envio de datos exitoso', 'El item a sido creado con exito');
        }
        
    } catch (error) {
        console.log(error)
    }
}

export function* removeCustomerSaga(action){
    yield removeCustomerAPI(action.customer);
    const customers = yield getCustomerAPI();
    const newData = {...action, customers:customers.data};
    yield put(removeCustomerSlice(newData));
}

export function* searchCustomerSaga(action){
    try {
        const customers = yield getCustomerAPI();
        const newData = {...action,customers:customers.data};
        yield put(searchCustomerSlice(newData));
    } catch (error) {
        console.log(error);
    }
}

export function* openFormCustomerSaga(action){ yield put(openFormCustomerSlice(action)); }
export function* closeFormCustomerSaga(action){ yield put(closeFormCustomerSlice(action)); }

export function* getAllCustomerSaga(action){
    yield put(getAllCustomerSlice(action));
}
export function* setCustomerSaga(action){
    yield put(setCustomerSlice(action));
}

export function* customerSaga(){
    yield takeEvery(GET_CUSTOMER, getCustomerSaga);
    yield takeEvery(OPEN_FORM_CUSTOMER, openFormCustomerSaga);
    yield takeEvery(CLOSE_FORM_CUSTOMER, closeFormCustomerSaga);
    yield takeEvery(ADD_CUSTOMER, addCustomerSaga);
    yield takeEvery(UPDATE_CUSTOMER, updateCustomerSaga);
    yield takeEvery(REMOVE_CUSTOMER, removeCustomerSaga);
    yield takeEvery(SEARCH_CUSTOMER, searchCustomerSaga);
    yield takeEvery(GET_ALL_CUSTOMER, getAllCustomerSaga);
    yield takeEvery(SET_CUSTOMER, setCustomerSaga);
}