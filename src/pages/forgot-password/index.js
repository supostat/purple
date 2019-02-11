import React, { Component } from 'react';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import Link from 'found/lib/Link';

import NotAuthorizedLayout from '~/layouts/not-authorized-layout';
import resetPassword from '~/assets/images/illustration-lock-refresh-accent-primary.svg';
import { ForgotPasswordForm, AlmostDone } from './components';
import { sendResetPasswordEmailLinkAction, goBackAction } from './redux/actions';
import { showAlmostDoneSelector } from './redux/selectors';

class ForgotPasswordPage extends Component {
  renderSendPasswordResetForm = () => {
    const sendResetPasswordEmailLink = oFetch(this.props, 'sendResetPasswordEmailLink');
    return (
      <div className="purple-modal purple-modal_size_m-minor purple-modal_space_m">
        <header className="purple-modal__header purple-modal__header_justify_center">
          <img src={resetPassword} alt="reset password" className="purple-modal__image" />

          <h2 className="purple-modal__title purple-modal__title_size_l">
            <span className="purple-modal__title-bold">Forgot your Password?</span>
          </h2>
          <p className="purple-modal__subtitle">Please enter your email</p>
        </header>
        <div className="purple-modal__content">
          <div className="purple-modal__group">
            <ForgotPasswordForm onSubmit={sendResetPasswordEmailLink} />
          </div>
          <div className="purple-modal__actions">
            <Link to="/" className="purple-modal__link">
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const [showAlmostDone, goBack] = oFetch(this.props, 'showAlmostDone', 'goBack');
    return (
      <NotAuthorizedLayout>
        {showAlmostDone ? <AlmostDone onGoBackClick={goBack} /> : this.renderSendPasswordResetForm()}
      </NotAuthorizedLayout>
    );
  }
}

const mapDispatchToProps = {
  sendResetPasswordEmailLink: sendResetPasswordEmailLinkAction,
  goBack: goBackAction,
};

const mapStateToProps = state => {
  return {
    showAlmostDone: showAlmostDoneSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordPage);

export { default as forgotPasswordReducers } from './redux/reducers';
