import React, { Component, Fragment } from 'react';
import { Field } from 'react-final-form';
import oFetch from 'o-fetch';
import lockImage from '~/assets/images/illustration-lock-accent-primary.svg';

import { InputField } from '~/components/form-fields';
import AcceptInviteWizard from './accept-invite-wizard';

export default class AcceptInviteForm extends Component {
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
      <div className="purple-modal purple-modal_size_m-minor purple-modal_space_m">
        <AcceptInviteWizard initialValues={initialValues} onSubmit={this.onSubmit}>
          <AcceptInviteWizard.Page
            headerRenderer={() => (
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
            )}
          >
            <Fragment>
              <Field name="password" label="Password" type="password" component={InputField} placeholder="Password" />
              <Field
                name="passwordConfirmation"
                label="Password confirmation"
                type="password"
                component={InputField}
                placeholder="Password confirmation"
              />
            </Fragment>
          </AcceptInviteWizard.Page>
          <AcceptInviteWizard.Page
            headerRenderer={() => (
              <header className="purple-modal__header purple-modal__header_justify_center">
                <img src={lockImage} alt="login" className="purple-modal__image" />
                <h2 className="purple-modal__title purple-modal__title_size_l">
                  <span className="purple-modal__title-bold">Set Two Factor Authentication</span>
                </h2>
                <p className="purple-modal__subtitle">
                  Almost done! Please download the authenticator app on your mobile device, scan this QR code, then
                  enter the confirmation code
                </p>
              </header>
            )}
          >
            <Fragment>
              <div className="purple-form__field purple-form__field_justify_center">
                <img src={TFOQRCode} alt="" className="purple-form__image purple-form__image_size_auto" />
              </div>
              <Field name="authCode" type="number" component={InputField} placeholder="Confirmation code" />
            </Fragment>
          </AcceptInviteWizard.Page>
        </AcceptInviteWizard>
      </div>
    );
  }
}
