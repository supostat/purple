import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import { InputField, CheckboxField } from '~/components/form-fields';

export default class LoginForm extends Component {
  onSubmit = values => {
    const { onSubmit } = this.props;
    return onSubmit(values).then(result => {
      if (result.error) {
        if (result.payload.response.error) {
          return { [FORM_ERROR]: [result.payload.response.error] };
        }
      }
      return result;
    });
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={this.props.initialValues}
        render={({ handleSubmit, submitting, pristine, submitError }) => {
          return (
            <form onSubmit={handleSubmit}>
              {submitError && (
                <div className="purple-form-error purple-form-error_role_general purple-form-error_position_above">
                  <p className="purple-form-error__text">{submitError}</p>
                </div>
              )}
              <Field name="email" label="Email" type="email" component={InputField} placeholder="Email Address" />
              <Field name="password" label="Password" type="password" component={InputField} placeholder="Password" />
              <Field
                name="authCode"
                label="Authentication code"
                type="text"
                component={InputField}
                placeholder="Authentication code"
              />
              <Field name="rememberMe" type="checkbox" text="Remember Me" component={CheckboxField} />
              <div className="purple-form__field purple-form__field_justify_center purple-form__field_position_last">
                <button
                  disabled={submitting}
                  className="purple-button purple-button_color_accent-primary purple-button_size_l"
                  type="submit"
                >
                  <span className="purple-button__text">Next</span>
                </button>
              </div>
            </form>
          );
        }}
      />
    );
  }
}
