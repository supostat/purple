export const isObject = value => {
  return value && typeof value === 'object' && value.constructor === Object;
};

export const isNull = value => {
  return value === null;
};

export const isUndefined = value => {
  return typeof value === 'undefined';
};

export const isBoolean = value => {
  return typeof value === 'boolean';
};

export const isFunction = value => {
  return typeof value === 'function';
};

export const isNumber = value => {
  return typeof value === 'number' && Number.isFinite(value);
};

export const isString = value => {
  return typeof value === 'string' || value instanceof String;
};

export const isArray = value => {
  return Array.isArray(value);
};
