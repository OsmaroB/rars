import { errorMessage } from 'helpers/messages'

const validation = {};

validation.add = (data) => {
    const errors = [];
    if(data.price <= 0){
        errors.push('Ingresa un precio valido mayor de 0.00');
    }
    if(data.checkSubchannel && (data.channelID === undefined || data.channelID === '')){
        errors.push('Selecciona un subcanal valido');
    }
    if(data.selectOptionID === 'OPT' && (data.optionalProductID === undefined || data.optionalProductID === '')){
        errors.push('Selecciona un opcional');
    }
    if(data.selectOptionID === 'PRO' && (data.buttonDetailID === undefined || data.buttonDetailID === '')){
        errors.push('Selecciona un producto');
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