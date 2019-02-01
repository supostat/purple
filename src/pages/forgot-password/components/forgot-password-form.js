import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import oFetch from 'o-fetch';
import { FORM_ERROR } from 'final-form';

import { InputField } from '~/components/form-fields';

export default class ForgotPasswordForm extends Component {
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
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={{ email: null }}
        render={({ handleSubmit, submitting, pristine, submitError }) => (
          <form onSubmit={handleSubmit}>
            {submitError && (
              <div className="purple-form-error purple-form-error_role_general purple-form-error_position_above">
                <p className="purple-form-error__text">{submitError}</p>
              </div>
            )}
            <Field name="email" label="Email" type="email" component={InputField} placeholder="Email Address" />
            <div className="purple-form__field purple-form__field_justify_center purple-form__field_position_last">
              <button
                disabled={submitting}
                className="purple-button purple-button_color_accent-primary purple-button_size_l"
                type="submit"
              >
                <span className="purple-button__text">Email link</span>
              </button>
            </div>
          </form>
        )}
      />
    );
  }
}
