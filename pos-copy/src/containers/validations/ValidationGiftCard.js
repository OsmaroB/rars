import { errorMessage } from 'helpers/messages'

const validation = {};

validation.data = (data) => {
    const regex = new RegExp("^[a-zA-Z ]+$");
    const errors = [];
    if(data.name === ''){
        errors.push('No puedes dejar el nombre vacio');
    }
    if(data.totalBalance === ''){
        errors.push('No puedes dejar el total vacio');
    }
    if(data.currentBalance === ''){
        errors.push('No puedes dejar el saldo actual vacio');
    }
    if(data.customerID === ''){
        errors.push('No puedes dejarlo sin cliente');
    }
    if(data.restaurantID === ''){
        errors.push('No puedes dejarlo sin restaurante');
    }
    if (!regex.test(data.name)) {
        errors.push('No puedes ingresar numeros en el nombre');
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