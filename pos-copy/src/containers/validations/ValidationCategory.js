import { errorMessage } from 'helpers/messages'
import globalValidator from 'helpers/globalValidator';

const validation = {};

validation.data = (data) => {
    const errors = [];
    if(data.name === ''){
        errors.push('No puedes dejar vacio el nombre')
    }
    if(data.position === ''){
        errors.push('No puedes dejar la posición vacia')
    }
    if(globalValidator.letterAndNumber(data.name).status){
        errors.push(globalValidator.letterAndNumber(data.name).message + " en el campo nombre");
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