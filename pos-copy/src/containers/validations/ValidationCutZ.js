import { errorMessage } from 'helpers/messages';

const validation = {};


validation.search = (data) => {
  const errors = [];
  if (data.date === undefined || data.date === null) {
    errors.push('Selecciona una fecha');
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
