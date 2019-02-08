import React from 'react';

import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import createConnectedRouter from 'found/lib/createConnectedRouter';
import { hot } from 'react-hot-loader';
import { Route } from 'found';
import AuthorizedRoute from './authorized-route';
import UnauthorizedRoute from './unauthorized-route';
import { getAcceptInvintationPageData } from './pages/accept-invite';
import { getInvitesPageData } from './pages/invites';
import { getUsersPageData } from './pages/users';
import { getUserProfilePageData } from './pages/user-profile';
import { setAuthUserFromJwt } from './redux/actions/auth-user';

import { Page401, Page403, Page404 } from '~/components/pages';

export const routeConfig = makeRouteConfig(
  <Route path="/" getComponent={() => import('./pages').then(module => module.AppPage)} getData={setAuthUserFromJwt}>
    <Route getComponent={() => import('./pages').then(module => module.HomePage)} />
    <Route
      path="accept-invite/:invitationToken"
      getData={getAcceptInvintationPageData}
      getComponent={() => import('./pages').then(module => module.AcceptInvitePage)}
    />
    <UnauthorizedRoute path="login" getComponent={() => import('./pages').then(module => module.LoginPage)} />
    <UnauthorizedRoute
      path="forgot-password"
      getComponent={() => import('./pages').then(module => module.ForgotPasswordPage)}
    />
    <UnauthorizedRoute
      path="reset-password"
      getComponent={() => import('./pages').then(module => module.ResetPasswordPage)}
    />
    <AuthorizedRoute
      path="users"
      getComponent={() => import('./pages').then(module => module.UsersPage)}
      getData={getUsersPageData}
    />
    <AuthorizedRoute
      path="invites"
      getComponent={() => import('./pages').then(module => module.InvitesPage)}
      getData={getInvitesPageData}
    />
    <AuthorizedRoute
      path="users/:id"
      getComponent={() => import('./pages').then(module => module.UserProfilePage)}
      getData={getUserProfilePageData}
    />
  </Route>,
);

const render = createRender({
  renderError: ({ error }) => {
    switch (error.status) {
      case 404:
        return <Page404 />;
      case 403:
        return <Page403 />;
      case 401:
        return <Page401 />;
      default:
        return null;
    }
  },
});

const Router = createConnectedRouter({
  render,
});

export default hot(module)(Router);
