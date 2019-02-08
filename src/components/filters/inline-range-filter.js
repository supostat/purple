import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import oFetch from 'o-fetch';
import { FORM_ERROR } from 'final-form';
import { DateRangePickerField } from '~/components/form-fields';
import { DateFormats } from '~/utils';

export default class InlineRangeFilter extends Component {
  handleSubmit = values => {
    const [startDate, endDate] = oFetch(values, 'range.startDate', 'range.endDate');
    const onSubmit = oFetch(this.props, 'onSubmit');
    return onSubmit({ startDate, endDate }).then(response => {
      if (response.error) {
        const serverErrors = oFetch(response, 'payload.response.errors');
        if (serverErrors.base) {
          return { [FORM_ERROR]: serverErrors.base, ...serverErrors };
        }
        return serverErrors;
      }
      return response;
    });
  };

  render() {
    const initialValues = oFetch(this.props, 'initialValues');
    return (
      <Form initialValues={{ range: initialValues }} onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit} className="purple-form">
              <div className="purple-form__row purple-form__row_position_last">
                <div className="purple-form__field purple-form__field_size_min">
                  <h3 className="purple-form__title purple-form__title_adjust_row">Filter</h3>
                </div>
                <div className="purple-form__field purple-form__field_size_max">
                  <Field
                    name="range"
                    label="First Name"
                    resultFormat={DateFormats.commonDateFormat}
                    component={DateRangePickerField}
                    placeholder="First Name"
                  />
                </div>
                <div className="purple-form__field purple-form__field_size_min purple-form__field_justify_end purple-form__field_position_last">
                  <button
                    disabled={submitting}
                    type="submit"
                    className="purple-button purple-button_size_l purple-button_color_accent-primary purple-button_size_full-xs"
                  >
                    <span className="purple-button__text">Update</span>
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}
