import qs from 'query-string';
import * as TypeCheckers from './type-checkers';

export { default as ApiService } from './api-service';
export { default as RoutesService } from './routes-service';
export { default as AuthService } from './auth-service';
export { default as DateFormats } from './date-formats';
export * from './type-checkers';

export const mapCount = (count = 10, callback) => new Array(count).fill(null).map(callback);

export const randomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export function setNullAsUndefined(object) {
  return Object.entries(object).reduce((acc, entry) => {
    const [key, value] = entry;
    return {
      ...acc,
      [key]: value === null ? undefined : value,
    };
  }, {});
}

export const queryStringOrNull = object => {
  const queryString = qs.stringify({ ...setNullAsUndefined(object) });
  return queryString ? `?${queryString}` : '';
};

export const safeJSONParse = possibleJsonString => {
  try {
    return JSON.parse(possibleJsonString);
  } catch (e) {
    return possibleJsonString;
  }
};

export const safeSeparate = (possibleArray, key, separator = ', ') => {
  if (TypeCheckers.isArray(possibleArray)) {
    return possibleArray
      .map(value => {
        if (!TypeCheckers.isObject(value)) {
          throw new Error(`Array entry should be object, got: ${value}`);
        }
        if (TypeCheckers.isUndefined(value[key])) {
          throw new Error(`Array entry with key: ${key} should be exist, got: ${value[key]}`);
        }
        return value[key];
      })
      .join(separator);
  }
  return possibleArray;
};

export function getValueLabelArrayFromObject(object) {
  return Object.entries(object).map(entry => {
    const [value, label] = entry;
    return {
      value,
      label,
    };
  });
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
