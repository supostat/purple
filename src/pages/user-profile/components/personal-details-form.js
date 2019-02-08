import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import oFetch from 'o-fetch';
import { FORM_ERROR } from 'final-form';

import { InputField } from '~/components/form-fields';

export default class PersonalDetailsForm extends Component {
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
              <Field name="firstName" label="First Name" type="text" component={InputField} placeholder="First Name" />
              <Field name="surname" label="Surname" type="text" component={InputField} placeholder="Surname" />
              <Field name="email" label="Email" type="email" component={InputField} placeholder="Email" />
              <div className="purple-form__field purple-form__field_justify_center-s-major purple-form__field_position_last">
                <button
                  type="submit"
                  disabled={submitting}
                  className="purple-button purple-button_color_accent-primary purple-button_icon_plus"
                >
                  <span className="purple-button__text">Update</span>
                </button>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}
