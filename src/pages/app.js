import React, { Component, Fragment } from 'react';
import oFetch from 'o-fetch';
import { AppHeader } from '~/components';
import { SomethingWentWrong } from '~/components/pages';
import AuthService from '~/utils/auth-service';

class AppPage extends Component {
  state = {
    isSomethingWentWrong: false,
    somethingWentWrongData: null,
  };

  static getDerivedStateFromError(error) {
    return { isSomethingWentWrong: true, somethingWentWrongData: error };
  }

  render() {
    const hasToken = AuthService.getJwtToken();
    const [isSomethingWentWrong, somethingWentWrongData] = oFetch(
      this.state,
      'isSomethingWentWrong',
      'somethingWentWrongData',
    );
    if (isSomethingWentWrong) {
      return <SomethingWentWrong data={somethingWentWrongData} />;
    }
    return (
      <Fragment>
        {hasToken && <AppHeader />}
        {this.props.children}
      </Fragment>
    );
  }
}

export default AppPage;
