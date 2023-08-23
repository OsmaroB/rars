import { put, takeEvery } from 'redux-saga/effects';
import {
    getDocumentType as getDocumentTypeAPI,
    addDocumentType as addDocumentTypeAPI,
    updateDocumentType as updateDocumentTypeAPI,
    removeDocumentType as removeDocumentTypeAPI,
} from '../../apis/document-type';
import {
    getDocumentTypeSlice,
    openFormDocumentTypeSlice,
    closeFormDocumentTypeSlice,
    addDocumentTypeSlice,
    updateDocumentTypeSlice,
    removeDocumentTypeSlice,
    searchDocumentTypeSlice,
} from './slice';
import {
    GET_DOCUMENT_TYPE,
    OPEN_FORM_DOCUMENT_TYPE,
    CLOSE_FORM_DOCUMENT_TYPE,
    ADD_DOCUMENT_TYPE,
    UPDATE_DOCUMENT_TYPE,
    REMOVE_DOCUMENT_TYPE,
    SEARCH_DOCUMENT_TYPE,
} from '../contants';

export function* getDocumentTypeSaga(){
    const documentTypes = yield getDocumentTypeAPI();
    yield put(getDocumentTypeSlice(documentTypes.data));
}
export function* updateDocumentTypeSaga(action){
    yield updateDocumentTypeAPI(action.documentType);
    const documentTypes = yield getDocumentTypeAPI();
    const newData = {...action, documentTypes:documentTypes.data};
    yield put(updateDocumentTypeSlice(newData));
}

export function* addDocumentTypeSaga(action){
    yield addDocumentTypeAPI(action.documentType);
    const documentTypes = yield getDocumentTypeAPI();
    const newData = {...action, documentTypes:documentTypes.data};
    yield put(addDocumentTypeSlice(newData));
}

export function* removeDocumentTypeSaga(action){
    yield removeDocumentTypeAPI(action.documentType);
    const documentTypes = yield getDocumentTypeAPI();
    const newData = {...action, documentTypes:documentTypes.data};
    yield put(removeDocumentTypeSlice(newData));
}

export function* searchDocumentTypeSaga(action){
    const documentTypes = yield getDocumentTypeAPI();
    const newData = {...action,documentTypes:documentTypes.data};
    yield put(searchDocumentTypeSlice(newData));
}

export function* openFormDocumentTypeSaga(action){ yield put(openFormDocumentTypeSlice(action)); }
export function* closeFormDocumentTypeSaga(action){ yield put(closeFormDocumentTypeSlice(action)); }


export function* DocumentTypeSaga(){
    yield takeEvery(GET_DOCUMENT_TYPE, getDocumentTypeSaga);
    yield takeEvery(OPEN_FORM_DOCUMENT_TYPE, openFormDocumentTypeSaga);
    yield takeEvery(CLOSE_FORM_DOCUMENT_TYPE, closeFormDocumentTypeSaga);
    yield takeEvery(ADD_DOCUMENT_TYPE, addDocumentTypeSaga);
    yield takeEvery(UPDATE_DOCUMENT_TYPE, updateDocumentTypeSaga);
    yield takeEvery(REMOVE_DOCUMENT_TYPE, removeDocumentTypeSaga);
    yield takeEvery(SEARCH_DOCUMENT_TYPE, searchDocumentTypeSaga);

}