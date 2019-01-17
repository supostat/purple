import React from 'react';
import { RedirectException, Route } from 'found';
import AuthService from '~/utils/auth-service';
import { LoadingIndicator } from './components';

export default class UnauthorizedRoute extends Route {
  render({ Component, props }) {
    if (Component && props) {
      if (AuthService.getJwtToken()) throw new RedirectException('/widgets');
      return <Component {...props} />;
    }
    return <LoadingIndicator />;
  }
}
