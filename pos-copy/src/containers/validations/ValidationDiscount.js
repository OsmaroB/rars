import { errorMessage } from 'helpers/messages';

const validation = {};

validation.add = (data) => {
  const errors = [];
  if (data.name === '') {
    errors.push('No puedes dejar el nombre vacio');
  }
  if (data.discountInfo === '') {
    errors.push('No puedes dejar el monto a descontar vacio');
  }
  if (data.type === '') {
    errors.push('No puedes dejar el tipo de descuento vacio');
  }
  if (errors.length > 0) {
    errors.map((e) => {
      return errorMessage('', e);
    });
    return false;
  }
  return true;
};

validation.update = (data) => {
  const regex = new RegExp('^[a-zA-Z ]+$');
  const errors = [];
  if (data.name === '') {
    errors.push('No puedes dejar vacio el nombre');
  }
  if (data.user === '') {
    errors.push('No puedes dejar el usuario vacio');
  }
  if (data.email === '') {
    errors.push('No puedes dejar el correo vacio');
  }
  if (!regex.test(data.name)) {
    errors.push('No puedes ingresar numeros en el nombre');
  }
  if (!regex.test(data.user)) {
    errors.push('No puedes ingresar numeros en el usuario');
  }
  if (errors.length > 0) {
    errors.map((e) => {
      return errorMessage('', e);
    });
    return false;
  }
  return true;
};

export default validation;
