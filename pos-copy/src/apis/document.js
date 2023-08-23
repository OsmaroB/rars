import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Categories
export const getDocument = async () => {
    const data = await axios.get('/documents', headerUrl);
    return data.data;
}
export const getDocumentForId = async (id) => {axios.get(`/documents/${id}`, headerUrl)};
export const addDocument = async (document) => {
    const data =  await axios.post('/documents', document, headerUrl);
    return data.data
};
export const updateDocument = async (document) => {
    await axios.put(`/documents/${document.id}`, document, headerUrl);
};
export const removeDocument = async (document) => {
    axios.put(`/documents-remove/${document.id}`,document, headerUrl)
};

export const getDocumentForDocumentType = async (document) => {
    const data = await axios.post(`/documents-for-document-type`,
    document,
    headerUrl)
    return data.data
};