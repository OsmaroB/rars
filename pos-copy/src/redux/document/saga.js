import { put, takeEvery } from 'redux-saga/effects';
import {
    getDocument as getDocumentAPI,
    addDocument as addDocumentAPI,
    updateDocument as updateDocumentAPI,
    removeDocument as removeDocumentAPI,
    getDocumentForDocumentType as getDocumentForTypeAPI
} from '../../apis/document';
import {
    getDocumentSlice,
    openFormDocumentSlice,
    closeFormDocumentSlice,
    addDocumentSlice,
    updateDocumentSlice,
    removeDocumentSlice,
    searchDocumentSlice,
    getDocumentForDocIDSlice,
    getAllSlice,
} from './slice';
import {
    GET_DOCUMENT,
    OPEN_FORM_DOCUMENT,
    CLOSE_FORM_DOCUMENT,
    ADD_DOCUMENT,
    UPDATE_DOCUMENT,
    REMOVE_DOCUMENT,
    SEARCH_DOCUMENT,
    GET_DOCUMENT_FOR_TYPE,
    GET_ALL_DOCUMENTS,
} from '../contants';

export function* getDocumentSaga(){
    try {
        const documents = yield getDocumentAPI();
        yield put(getDocumentSlice(documents.data));
    } catch (error) {
        console.log(error);
    }
}
export function* updateDocumentSaga(action){
    yield updateDocumentAPI(action.document);
    const documents = yield getDocumentAPI();
    const newData = {...action, documents:documents.data};
    yield put(updateDocumentSlice(newData));
}

export function* addDocumentSaga(action){
    yield addDocumentAPI(action.document);
    const documents = yield getDocumentAPI();
    const newData = {...action, documents:documents.data};
    yield put(addDocumentSlice(newData));
}

export function* removeDocumentSaga(action){
    yield removeDocumentAPI(action.document);
    const documents = yield getDocumentAPI();
    const newData = {...action, documents:documents.data};
    yield put(removeDocumentSlice(newData));
}

export function* searchDocumentSaga(action){
    const documents = yield getDocumentAPI();
    const newData = {...action,documents:documents.data};
    yield put(searchDocumentSlice(newData));
}


export function* getDocumentForDocIDSaga(action){
    const documentTypes = (action.documentTypes).filter((documentType)=>{
        return documentType.status == 0;
    })
    const documents = yield getDocumentAPI();

    const newDocumentData=[];
    documentTypes.map((documentType)=>{
        const documentForType = (documents.data).filter((document)=>{
            return document.documentTypeID == documentType.id;
        })
        if(documentForType.length >0){
            newDocumentData.push(documentForType[documentForType.length-1]);
        }
    });
    // console.log(newDocumentData);
    yield put(getDocumentForDocIDSlice({documents:newDocumentData}));
}

export function* openFormDocumentSaga(action){ yield put(openFormDocumentSlice(action)); }
export function* closeFormDocumentSaga(action){ yield put(closeFormDocumentSlice(action)); }

export function* getAllSaga(action){
    yield put(getAllSlice(action));
}
 
export function* documentSaga(){
    yield takeEvery(GET_DOCUMENT, getDocumentSaga);
    yield takeEvery(OPEN_FORM_DOCUMENT, openFormDocumentSaga);
    yield takeEvery(CLOSE_FORM_DOCUMENT, closeFormDocumentSaga);
    yield takeEvery(ADD_DOCUMENT, addDocumentSaga);
    yield takeEvery(UPDATE_DOCUMENT, updateDocumentSaga);
    yield takeEvery(REMOVE_DOCUMENT, removeDocumentSaga);
    yield takeEvery(SEARCH_DOCUMENT, searchDocumentSaga);
    yield takeEvery(GET_DOCUMENT_FOR_TYPE, getDocumentForDocIDSaga);
    yield takeEvery(GET_ALL_DOCUMENTS, getAllSaga)

}