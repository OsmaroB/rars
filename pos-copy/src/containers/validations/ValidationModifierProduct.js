import { errorMessage } from 'helpers/messages'

const validation = {};

validation.add = (data) => {
    const errors = [];
    if(data.productID === ''){
        errors.push('Debes elegir un producto');
    }
    if(data.productName === ''){
        errors.push('No puedes dejar el producto vacio');
    }
    if(data.modifierID === ''){
        errors.push('Debes elegir un Agregado');
    }
    if(data.modifierName === ''){
        errors.push('No puedes dejar el Agregado vacio');
    }
    if(data.userCreate === ''){
        errors.push('No puedes dejar el usuario de creación vacio');
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
    if(data.productID === ''){
        errors.push('Debes elegir un producto');
    }
    if(data.productName === ''){
        errors.push('No puedes dejar el producto vacio');
    }
    if(data.modifierID === ''){
        errors.push('Debes elegir un Agregado');
    }
    if(data.modifierName === ''){
        errors.push('No puedes dejar el Agregado vacio');
    }
    if(data.userUpdate === ''){
        errors.push('No puedes dejar el usuario de creación vacio');
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