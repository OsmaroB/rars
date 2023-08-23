import axios from "axios";
import {urlApi, headerUrl} from './config';

axios.defaults.baseURL = urlApi;

// Modifier
export const getModifier = async () => axios.get('/modifiers', headerUrl);
export const getModifierForId = async (id) => {axios.get(`/modifiers/${id}`, headerUrl)};
export const addModifier = async (modifier) => {
    await axios.post('/modifiers', modifier, headerUrl);
};
export const updateModifier = async (modifier) => {axios.put(`/modifiers/${modifier.id}`, modifier, headerUrl)};
export const removeModifier = async (modifier) => {axios.put(`/modifiers-remove/${modifier.id}`, modifier, headerUrl)};