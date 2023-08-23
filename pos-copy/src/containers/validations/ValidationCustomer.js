import { errorMessage } from 'helpers/messages'
import globalValidator from 'helpers/globalValidator';

const validation = {};

validation.data = (data) => {
    const regex = new RegExp("^[a-zA-Z ]+$");
    const errors = [];
    if(data.name === ''){
        errors.push('No puedes dejar el nombre vacio');
    }
    if(data.lastname === ''){
        errors.push('No puedes dejar el nombre vacio');
    }
    if(data.dui === ''){
        errors.push('No puedes dejar el dui vacio');
    }
    if(data.email === ''){
        errors.push('No puedes dejar el correo vacio');
    }
    if(globalValidator.letterAndNumber(data.name).status){
        errors.push(globalValidator.letterAndNumber(data.name).message + " en el campo nombre");
    }
    if(globalValidator.letterAndNumber(data.lastname).status){
        errors.push(globalValidator.letterAndNumber(data.lastname).message + " en el campo apellido");
    }
    if(globalValidator.validEmail(data.email).status){
        errors.push(globalValidator.validEmail(data.email).message + " en el campo correo");
    }
    if(globalValidator.onlyNumber(data.dui).status){
        errors.push(globalValidator.onlyNumber(data.dui).message + " en el campo DUI");
    }
    if(errors.length>0){
        errors.map((e)=>{
            return errorMessage('', e);
        });
        return false;
    }
    return true;
};


export default validation;