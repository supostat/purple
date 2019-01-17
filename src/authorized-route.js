import React from 'react';
import { HttpError, Route } from 'found';
import AuthService from '~/utils/auth-service';
import { LoadingIndicator } from './components';

export default class AuthorizedRoute extends Route {
  render({ Component, props }) {
    if (Component && props) {
      if (!AuthService.getJwtToken()) throw new HttpError(401);
      return <Component {...props} />;
    }
    return <LoadingIndicator />;
  }
}
