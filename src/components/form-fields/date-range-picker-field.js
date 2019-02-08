import * as React from 'react';
import oFetch from 'o-fetch';
import { DateRangePicker } from '~/components/react-dates';

class DateRangePickerField extends React.Component {
  onChange = value => {};

  render() {
    const [input, meta, resultFormat] = oFetch(this.props, 'input', 'meta', 'resultFormat');
    const errors = meta.error || meta.submitError;
    const [startDate, endDate, onChange] = oFetch(input, 'value.startDate', 'value.endDate', 'onChange');
    return (
      <div className="purple-form-field">
        <div className="purple-form-field__component">
          <div className="date-control date-control_type_icon date-control_type_interval-fluid">
            <DateRangePicker resultFormat={resultFormat} startDate={startDate} endDate={endDate} onApply={onChange} />
          </div>
        </div>
      </div>
    );
  }
}

DateRangePickerField.defaultProps = {
  type: 'text',
  label: null,
  placeholder: null,
  fieldClassName: null,
  resultFormat: null,
};

export default DateRangePickerField;
