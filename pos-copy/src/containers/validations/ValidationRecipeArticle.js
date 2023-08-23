import { errorMessage } from 'helpers/messages'

const validation = {};

validation.add = (data) => {
    const errors = [];
    if(data.articleID === ''){
        errors.push('Debes elegit una receta');
    }
    if(data.quantity === ''){
        errors.push('No puedes dejar la cantidad vacia');
    }
    if(data.productID === ''){
        errors.push('Debes elegir un producto');
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
    if(data.articleID === ''){
        errors.push('Debes elegit una receta');
    }
    if(data.quantity === ''){
        errors.push('No puedes dejar la cantidad vacia');
    }
    if(data.productID === ''){
        errors.push('Debes elegir un producto');
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