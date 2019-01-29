export { default as ApiService } from './api-service';
export { default as RoutesService } from './routes-service';
export { default as AuthService } from './auth-service';
export { default as DateFormats } from './date-formats';

export const mapCount = (count = 10, callback) => new Array(count).fill(null).map(callback);

export const randomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export function getValueLabelArrayFromObject(object) {
  return Object.entries(object).map(entry => {
    const [value, label] = entry;
    return {
      value,
      label,
    };
  });
}

export function setNullAsUndefined(object) {
  return Object.entries(object).reduce((acc, entry) => {
    const [key, value] = entry;
    return {
      ...acc,
      [key]: value === null ? undefined : value,
    };
  }, {});
}

export function getArrayOfNumbersFromStringOrArray(stringOrArray) {
  if (stringOrArray === undefined) {
    return [];
  }
  if (Array.isArray(stringOrArray)) {
    return stringOrArray.map(Number);
  }
  if (typeof stringOrArray === 'string') {
    if (stringOrArray.split(',').length > 0) {
      return stringOrArray.split(',').map(Number);
    }
    return [stringOrArray];
  }
  throw new Error('Argument must be a String or Array');
}
