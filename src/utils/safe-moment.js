import moment from 'moment';

export function isValidUIDate(str) {
  return str.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
}

export function parse(input, dateFormat) {
  if (arguments.length < 2) {
    throw new Error('Invalid arguments error: must supply input and dateFormat');
  }
  if (dateFormat === undefined || dateFormat === null) {
    throw new Error('Must supply valid dateFormat');
  }

  const result = moment(input, dateFormat, true);
  if (!result.isValid()) {
    throw new Error(`invalid date ${input} supplied`);
  }

  return result;
}

export function iso8601Parse(input) {
  return parse(input, moment.ISO_8601);
}

export function uiDateParse(input) {
  if (typeof input !== 'string') {
    throw new Error(`invalid uiDate ${input} supplied, not match 'DD-MM-YYYY'`);
  }
  if (!isValidUIDate(input)) {
    throw new Error(`invalid uiDate ${input} supplied, not match 'DD-MM-YYYY'`);
  }
  return parse(input, 'DD-MM-YYYY');
}
