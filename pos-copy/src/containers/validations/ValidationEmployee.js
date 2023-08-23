import { errorMessage } from 'helpers/messages'
import globalValidator from 'helpers/globalValidator';

const validation = {};

validation.data = (data) => {
    const errors = [];
    if(data.name === ''){
        errors.push('No puedes dejar el nombre vacio');
    }
    if(data.lastName === ''){
        errors.push('No puedes dejar el apellido vacio');
    }
    if(data.userCreate === '' || data.userCreate <=0){
        errors.push('No puedes dejar el usuario de creación vacio');
    }
    if(globalValidator.letterAndNumber(data.name).status){
        errors.push(globalValidator.letterAndNumber(data.name).message + " en el campo nombre");
    }
    if(globalValidator.letterAndNumber(data.description).status){
        errors.push(globalValidator.letterAndNumber(data.description).message + " en el campo descripción");
    }
    if(errors.length>0){
        errors.map((e)=>{
            return errorMessage('', e);
        });
        return false;
    }
    return true;
};

validation.update = (data) => {
    const errors = [];
    if(data.name === ''){
        errors.push('No puedes dejar el nombre vacio');
    }
    if(data.lastName === ''){
        errors.push('No puedes dejar el apellido vacio');
    }
    if(data.userUpdate === '' || data.userUpdate <=0){
        errors.push('No puedes dejar el usuario de creación vacio');
    }
    if(globalValidator.letterAndNumber(data.name).status){
        errors.push(globalValidator.letterAndNumber(data.name).message + " en el campo nombre");
    }
    if(globalValidator.letterAndNumber(data.description).status){
        errors.push(globalValidator.letterAndNumber(data.description).message + " en el campo descripción");
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