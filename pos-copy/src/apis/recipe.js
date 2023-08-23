import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// role
export const getRecipe = async () => axios.get('/recipes', headerUrl);
export const getRecipeForId = async (id) => {axios.get(`/recipes/${id}`, headerUrl)};
export const addRecipe = async (recipe) => {await axios.post('/recipes', recipe, headerUrl)};
export const updateRecipe = async (recipe) => {axios.put(`/recipes/${recipe.id}`, recipe, headerUrl)};
export const removeRecipe = async (recipe) => {axios.put(`/recipes-remove/${recipe.id}`, recipe, headerUrl)};