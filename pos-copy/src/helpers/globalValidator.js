const globalValidator = {};

globalValidator.validEmail = (value) => {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(value)){
        // incorrect
        return({status:true, message:'El email ingresado es incorrecto'})
    } else {
        // correct
        return({status:false})
    }
}

globalValidator.letterAndNumber = (value) => {
    const regex = /^[A-Za-z0-9\s]+$/g;
    if (!regex.test(value)){
        // incorrect
        return({status:true, message:'Solo se admiten números, letras y espacios'})
    } else {
        // correct
        return({status:false})
    }  
}

globalValidator.onlyLetterAndNumber = (value) => {
    const regex = /^[A-Za-z0-9]+$/;
    if (!regex.test(value)){
        // incorrect
        return({status:true, message:'Solo se admiten números y letras'})
    } else {
        // correct
        return({status:false})
    }  
}

globalValidator.onlyNumber  = (value) => {
    const regex = /^[0-9]*$/
    if (!regex.test(value)){
        // incorrect
        return({status:true, message:'Solo se admiten números'})
    } else {
        // correct
        return({status:false})
    }  
}

globalValidator.onlyDecimal  = (value) => {
    const regex = /^[0-9\.]*$/
    if (!regex.test(value)){
        // incorrect
        return({status:true, message:'Solo se admiten números'})
    } else {
        // correct
        return({status:false})
    }  
}

export default globalValidator;