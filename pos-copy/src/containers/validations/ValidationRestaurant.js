import { errorMessage } from 'helpers/messages'

const validation = {};

validation.data = (data) => {
    const regex = new RegExp("^[a-zA-Z ]+$");
    const errors = [];
    if(data.name === ''){
        errors.push('No puedes dejar vacio el nombre')
    }
    if(data.address === ''){
        errors.push('No puedes dejar la dirección vacia')
    }
    if(data.brandID === ''){
        errors.push('Debes seleccionar una marca')
    }
    if (!regex.test(data.name)) {
        errors.push('No puedes ingresar numeros en el nombre')
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