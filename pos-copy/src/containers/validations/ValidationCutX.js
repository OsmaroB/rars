import { errorMessage } from 'helpers/messages';

const validation = {};

validation.add = (data) => {
  const errors = [];
  if (data.date === undefined || data.date === null) {
    errors.push('Selecciona una fecha');
  }
  if (data.prettycash === '') {
    errors.push('Ingresa un valor de fondo de caja');
  }
  if (data.prettycash <= 0) {
    errors.push('El valor no es válido');
  }
  if (errors.length > 0) {
    errors.map((e) => {
      return errorMessage('', e);
    });
    return false;
  }
  return true;
};
validation.report = (methods, payments) => {
  const errors = [];
  methods.forEach((method) => {
    if (method.value === '') {
      errors.push('Completa todos los campos');
      return false;
    }
  });
  payments.forEach((pay) => {
    if (pay.value === '') {
      errors.push('Completa todos los campos');
      return false;
    }
  });
  if (errors.length > 0) {
    errors.map((e) => {
      return errorMessage('', e);
    });
    return false;
  }
  return true;
};
export default validation;
