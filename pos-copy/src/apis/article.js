import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getArticle = async () => axios.get('/articles', headerUrl);
export const getArticleForId = async (id) => {axios.get(`/articles/${id}`, headerUrl)};
export const addArticle = async (article) => {await axios.post('/articles', article, headerUrl)};
export const updateArticle = async (article) => {axios.put(`/articles/${article.id}`, article, headerUrl)};
export const removeArticle = async (article) => {axios.put(`/articles-remove/${article.id}`, article, headerUrl)};