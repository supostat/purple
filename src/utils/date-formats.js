const commonDateFormat = 'DD-MM-YYYY';

export default {
  commonDateFormat,
  withShortWeek: `ddd ${commonDateFormat}`,
  withTimeAndShortWeek: `HH:mm ddd ${commonDateFormat}`,
  withTimeSecondsAndShortWeek: `HH:mm:ss ddd ${commonDateFormat}`,
};
