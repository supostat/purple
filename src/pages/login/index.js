import React, { Component } from 'react';
import LoginForm from './components/login-form';
import { userLogin } from './redux/actions';
import Link from 'found/lib/Link';
import { connect } from 'react-redux';
import NotAuthorizedLayout from '../../layouts/not-authorized-layout';
import lockImage from '~/assets/images/illustration-lock-accent-primary.svg';

class LoginPage extends Component {
  render() {
    const { handleUserLogin } = this.props;
    const initialValues = {
      email: null,
      password: null,
      authCode: null,
      rememberMe: true,
    };

    return (
      <NotAuthorizedLayout>
        <div className="purple-modal purple-modal_size_m-minor purple-modal_space_m">
          <header className="purple-modal__header purple-modal__header_justify_center">
            <img src={lockImage} alt="login" className="purple-modal__image" />
            <h2 className="purple-modal__title purple-modal__title_size_l">
              <span className="purple-modal__title-bold">Log In</span>
            </h2>
            <p className="purple-modal__subtitle">Please enter your jsm login credentials</p>
          </header>
          <div className="purple-modal__content">
            <LoginForm onSubmit={handleUserLogin} initialValues={initialValues} />
          </div>
          <div className="purple-modal__actions">
            <Link to="/widgets" className="purple-modal__link">
              Forgot your password?
            </Link>
          </div>
        </div>
      </NotAuthorizedLayout>
    );
  }
}

const mapDispatchToProps = {
  handleUserLogin: userLogin,
};

export default connect(
  null,
  mapDispatchToProps,
)(LoginPage);
