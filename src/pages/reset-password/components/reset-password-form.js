import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import oFetch from 'o-fetch';
import { FORM_ERROR } from 'final-form';

import { InputField, CheckboxField } from '~/components/form-fields';

export default class ResetPasswordForm extends Component {
  onSubmit = values => {
    const { onSubmit } = this.props;
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
      <Form
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, submitting, submitError, values }) => {
          const { showPassword } = values;
          const passwordType = showPassword ? 'text' : 'password';
          return (
            <form onSubmit={handleSubmit}>
              {submitError && (
                <div className="purple-form-error purple-form-error_role_general purple-form-error_position_above">
                  <p className="purple-form-error__text">{submitError}</p>
                </div>
              )}
              <Field
                name="password"
                label="Password"
                type={passwordType}
                component={InputField}
                placeholder="Password"
              />
              <Field
                name="passwordConfirmation"
                label="Password confirmation"
                type={passwordType}
                component={InputField}
                placeholder="Password confirmation"
              />
              <Field name="showPassword" type="checkbox" text="Show password" component={CheckboxField} />
              <div className="purple-form__field purple-form__field_justify_center purple-form__field_position_last">
                <button
                  disabled={submitting}
                  className="purple-button purple-button_color_accent-primary purple-button_size_l"
                  type="submit"
                >
                  <span className="purple-button__text">Submit</span>
                </button>
              </div>
            </form>
          );
        }}
      />
    );
  }
}
