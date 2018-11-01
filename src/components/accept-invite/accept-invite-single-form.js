import React, { Component, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import oFetch from 'o-fetch';
import lockImage from '../../../assets/images/illustration-lock-accent-primary.svg';

import { InputField } from '../UI/form-fields';

export default class AcceptInviteSingleForm extends Component {
  onSubmit = values => {
    const { onSubmit } = this.props;
    return onSubmit(values).then(response => {
      const hasErrors = response.error;
      if (hasErrors) {
        const payload = oFetch(response, 'payload');
        const status = oFetch(payload, 'status');
        if (status === 422) {
          const errors = oFetch(payload, 'response.errors');
          return errors;
        }
      }
      return response;
    });
  };

  render() {
    const initialValues = oFetch(this.props, 'initialValues');
    const TFOQRCode = oFetch(this.props, 'TFOQRCode');
    const invitedUser = oFetch(this.props, 'invitedUser');
    const [firstName, surname, email] = oFetch(invitedUser, 'firstName', 'surname', 'email');
    return (
      <Form
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        render={({ handleSubmit, submitting, submitError }) => (
          <form className="purple-modal purple-modal_size_m-minor purple-modal_space_m" onSubmit={handleSubmit}>
            <header className="purple-modal__header purple-modal__header_justify_center">
              <img src={lockImage} alt="login" className="purple-modal__image" />
              <h2 className="purple-modal__title purple-modal__title_size_l">
                <span className="purple-modal__title-bold">Set Password</span>
              </h2>
              <p className="purple-modal__subtitle">Hi {`${firstName} ${surname} (${email})`}</p>
              <p className="purple-modal__subtitle">
                Please fill in the following details and press Submit to complete the sign up process.
              </p>
            </header>
            <div className="purple-modal__content">
              {submitError && (
                <div className="purple-form-error purple-form-error_role_general purple-form-error_position_above">
                  <p className="purple-form-error__text">{submitError}</p>
                </div>
              )}
              <Field name="password" label="Password" type="password" component={InputField} placeholder="Password" />
              <Field
                name="passwordConfirmation"
                label="Password confirmation"
                type="password"
                component={InputField}
                placeholder="Password confirmation"
              />
              <p className="purple-modal__subtitle">
                Please download the{' '}
                <a href="#" className="purple-modal__link purple-modal__link_role_inline">
                  authenticator app
                </a>{' '}
                on your mobile device, scan this QR code, then enter the confirmation code
              </p>
              <div className="purple-form__field purple-form__field_justify_center">
                <img src={TFOQRCode} alt="" className="purple-form__image purple-form__image_size_auto" />
              </div>
              <Field name="authCode" type="number" component={InputField} placeholder="Confirmation code" />
              <div className="purple-form__field purple-form__field_justify_center purple-form__field_position_last">
                <button
                  disabled={submitting}
                  className="purple-button purple-button_color_accent-primary purple-button_size_l"
                  type="submit"
                >
                  <span className="purple-button__text">Sign Up</span>
                </button>
              </div>
            </div>
          </form>
        )}
      />
    );
  }
}
