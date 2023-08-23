import { errorMessage } from 'helpers/messages';

const validation = {};

validation.data = (data) => {
  const errors = [];
  if (data.output=== 0) {
    errors.push('Debes ingresar una cantidad mayor a cero');
  }
  if (data.description === '') {
    errors.push('No puedes dejar el campo descricpión vacio');
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