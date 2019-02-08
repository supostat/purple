import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import oFetch from 'o-fetch';
import { FORM_ERROR } from 'final-form';

import { CheckboxField, TextareaField } from '~/components/form-fields';

export default class DisableForm extends Component {
  handleSubmit = values => {
    const onSubmit = oFetch(this.props, 'onSubmit');
    return onSubmit(values).then(response => {
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
      <Form initialValues={initialValues} onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting, submitError }) => {
          return (
            <form onSubmit={handleSubmit} className="purple-form">
              {submitError && (
                <div className="purple-form-error purple-form-error_role_general purple-form-error_position_above">
                  <p className="purple-form-error__text">{submitError}</p>
                </div>
              )}
              <Field
                name="neverRehire"
                type="checkbox"
                text="Do not rehire this person (Give reason below)"
                component={CheckboxField}
              />
              <Field
                name="disabledReason"
                label="Reason for disabling"
                component={TextareaField}
                placeholder="Type your text here ..."
              />
              <div className="purple-form__field purple-form__field_justify_center-s-major purple-form__field_position_last">
                <button
                  type="submit"
                  disabled={submitting}
                  className="purple-button purple-button_color_accent-red purple-button_icon_power"
                >
                  <span className="purple-button__text">Disable</span>
                </button>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}
