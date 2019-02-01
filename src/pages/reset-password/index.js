import React, { Component } from 'react';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import Link from 'found/lib/Link';

import NotAuthorizedLayout from '~/layouts/not-authorized-layout';
import changePassword from '~/assets/images/illustration-lock-gear-accent-primary.svg';
import { ResetPasswordForm } from './components';
import { SuccessPage } from '~/components/pages';
import { resetPasswordAction, goBackAction } from './redux/actions';
import { showSuccessSelector } from './redux/selectors';

class ResetPasswordPage extends Component {
  renderSendPasswordResetForm = () => {
    const query = oFetch(this.props, 'location.query');
    const { token } = query;
    const resetPassword = oFetch(this.props, 'resetPassword');
    const initialValues = {
      password: null,
      passwordConfirmation: null,
      token: token || null,
    };

    return (
      <div className="purple-modal purple-modal_size_m-minor purple-modal_space_m">
        <header className="purple-modal__header purple-modal__header_justify_center">
          <img src={changePassword} alt="reset password" className="purple-modal__image" />

          <h2 className="purple-modal__title purple-modal__title_size_l">
            <span className="purple-modal__title-bold">Reset Password</span>
          </h2>
        </header>
        <div className="purple-modal__content">
          <div className="purple-modal__group">
            <ResetPasswordForm initialValues={initialValues} onSubmit={resetPassword} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const [showSuccess, goBack] = oFetch(this.props, 'showSuccess', 'goBack');
    return (
      <NotAuthorizedLayout>
        {showSuccess ? (
          <SuccessPage
            title="Success!"
            text="Your password was changed successfully"
            buttonText="Back"
            onButtonClick={goBack}
          />
        ) : (
          this.renderSendPasswordResetForm()
        )}
      </NotAuthorizedLayout>
    );
  }
}

const mapDispatchToProps = {
  resetPassword: resetPasswordAction,
  goBack: goBackAction,
};

const mapStateToProps = state => {
  return {
    showSuccess: showSuccessSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordPage);

export { default as resetPasswordReducers } from './redux/reducers';
