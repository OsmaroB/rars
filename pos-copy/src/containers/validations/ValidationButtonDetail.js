import { errorMessage } from 'helpers/messages'
import globalValidator from 'helpers/globalValidator';

const validation = {};

validation.data = (data) => {
    const errors = [];
    if(data.buttonID === ''){
        errors.push('No puedes dejar el campo nombre del botón vacio');
    }
    if(data.productName === ''){
        errors.push('No puedes dejar el campo nombre del producto vacio');
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
    if(data.buttonID === ''){
        errors.push('No puedes dejar el campo nombre del botón vacio');
    }
    if(data.productName === ''){
        errors.push('No puedes dejar el campo nombre del producto vacio');
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