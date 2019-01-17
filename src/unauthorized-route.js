import React from 'react';
import { RedirectException, Route } from 'found';
import AuthService from '~/utils/auth-service';
import { LoadingIndicator } from './components/UI';

export default class UnauthorizedRoute extends Route {
  render({ Component, matchContext, props }) {
    if (Component && props) {
      if (AuthService.getJwtToken()) throw new RedirectException('/widgets');
      return <Component {...props} />;
    }
    return <LoadingIndicator />;
  }
}
