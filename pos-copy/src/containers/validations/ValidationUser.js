import { errorMessage } from 'helpers/messages'
import globalValidator from 'helpers/globalValidator';

const validation = {};

validation.add = (data) => {
    const errors = [];
    if(data.name === ''){
        errors.push('No puedes dejar el nombre vacio');
    }
    if(data.email === ''){
        errors.push('No puedes dejar el correo vacio');
    }
    if(globalValidator.validEmail(data.email).status){
        errors.push(globalValidator.validEmail(data.email).message + " en el campo correo");
    }
    if(data.password === ''){
        errors.push('No puedes dejar la contraseña vacia');
    }
    if(data.confirmPass === ''){
        errors.push('No puedes dejar la confirmación contraseña vacia');
    }
    if(data.password !== data.confirmPass){
        errors.push('Las contraseñas no coinciden entre ellas');
    }
    if(globalValidator.letterAndNumber(data.name).status){
        errors.push(globalValidator.letterAndNumber(data.name).message + " en el campo nombre");
    }
    if(globalValidator.onlyLetterAndNumber(data.password).status){
        errors.push(globalValidator.onlyLetterAndNumber(data.password).message + " en el campo contraseña");
    }
    // if(!regexEmail.test(data.email)){
    //     errors.push('Debes ingresar un correo valido');
    // }
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
    if(data.email === ''){
        errors.push('No puedes dejar el correo vacio');
    }
    if(globalValidator.validEmail(data.email).status){
        errors.push(globalValidator.validEmail(data.email).message + " en el campo correo");
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