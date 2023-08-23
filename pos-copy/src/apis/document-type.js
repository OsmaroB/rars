import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// DocumentType
export const getDocumentType = async () => axios.get('/document-types', headerUrl);
export const getDocumentTypeForId = async (id) => {axios.get(`/document-types/${id}`, headerUrl)};
export const addDocumentType = async (documentType) => {await axios.post('/document-types', documentType, headerUrl)};
export const updateDocumentType = async (documentType) => {axios.put(`/document-types/${documentType.id}`, documentType, headerUrl)};
export const removeDocumentType = async (documentType) => {axios.put(`/document-types-remove/${documentType.id}`, documentType, headerUrl)};