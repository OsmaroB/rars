import axios from "axios";
import {urlApi} from './config';

axios.defaults.baseURL = urlApi;

// Categories
const login =  (user) => {
    const res =  axios.post('/login', user);
    return res;
};

export default login;