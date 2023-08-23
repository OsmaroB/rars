import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getRecipeArticle = async () => axios.get('/recipes-articles', headerUrl);
export const getRecipeArticleForId = async (id) => {axios.get(`/recipes-articles/${id}`, headerUrl)};
export const addRecipeArticle = async (recipesArticles) => {await axios.post('/recipes-articles', recipesArticles, headerUrl)};
export const updateRecipeArticle = async (recipesArticles) => {axios.put(`/recipes-articles/${recipesArticles.id}`, recipesArticles, headerUrl)};
export const removeRecipeArticle = async (recipesArticles) => {axios.put(`/recipes-articles-remove/${recipesArticles.id}`, recipesArticles, headerUrl)};