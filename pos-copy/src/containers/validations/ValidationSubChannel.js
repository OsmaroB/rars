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
    if(data.channelID === ''){
        errors.push('Selecciona un canal de venta');
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