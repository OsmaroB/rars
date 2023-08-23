import { errorMessage } from 'helpers/messages'

const validation = {};

validation.add = (data) => {
    const errors = [];
    if(data.url === ''){
        errors.push('No puedes dejar la ruta vacia');
    }
    if(data.userCreate === ''){
        errors.push('No puedes dejar la ruta vacia');
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
    if(data.url === ''){
        errors.push('No puedes dejar la ruta vacia');
    }
    if(data.userUpdate === ''){
        errors.push('No puedes dejar la ruta vacia');
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