import React, { Component, Fragment } from 'react';
import { AppHeader } from '~/components';
import AuthService from '~/utils/auth-service';

class AppPage extends Component {
  render() {
    const hasToken = AuthService.getJwtToken();
    return (
      <Fragment>
        {hasToken && <AppHeader />}
        {this.props.children}
      </Fragment>
    );
  }
}

export default AppPage;
