import Cookies from 'universal-cookie';

const cookies = new Cookies();
const clientToken = (cookies.getAll()).userToken;
export const urlApi =  'http://localhost:5001';
export const headerUrl = {
    headers: {
        "x-access-token": clientToken,
        "content-type": "application/json",
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}
