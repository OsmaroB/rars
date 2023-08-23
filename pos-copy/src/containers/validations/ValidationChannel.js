import { errorMessage } from 'helpers/messages'
import globalValidator from 'helpers/globalValidator';

const validation = {};

validation.data = (data) => {
    const errors = [];
    if(data.name === ''){
        errors.push('No puedes dejar vacio el nombre');
    }
    if(data.description === ''){
        errors.push('No puedes dejar la descripción vacia');
    }
    if(data.restaurant === ''){
        errors.push('No puedes dejar el restaurante vacio');
    }
    if(data.isChannel === ''){
        errors.push('No puedes dejar vacia si es canal o subcanal');
    }
    if(globalValidator.letterAndNumber(data.name).status){
        errors.push(globalValidator.letterAndNumber(data.name).message + " en el campo nombre");
    }
    if(globalValidator.letterAndNumber(data.description).status){
        errors.push(globalValidator.letterAndNumber(data.description).message + " en el campo descripción");
    }
    if(globalValidator.letterAndNumber(data.restaurant).status){
        errors.push(globalValidator.letterAndNumber(data.restaurant).message + " en el campo restaurante");
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