import React from 'react';

import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import createConnectedRouter from 'found/lib/createConnectedRouter';
import { hot } from 'react-hot-loader';
import { Route } from 'found';
import AuthorizedRoute from './authorized-route';
import UnauthorizedRoute from './unauthorized-route';
import { LoginPage, AcceptInvitePage, AppPage, HomePage, WidgetsPage, InvitesPage, UsersPage } from './pages';

import { getAcceptInvintationPageData } from './pages/accept-invite';
import { getInvitesPageData } from './pages/invites';
import { getUsersPageData } from './pages/users';
import { setAuthUserFromJwt } from './redux/actions/auth-user';

export const routeConfig = makeRouteConfig(
  <Route path="/" Component={AppPage} getData={setAuthUserFromJwt}>
    <Route Component={HomePage} />
    <UnauthorizedRoute path="login" Component={LoginPage} />
    <Route path="accept-invite/:invitationToken" getData={getAcceptInvintationPageData} Component={AcceptInvitePage} />
    <AuthorizedRoute path="widgets" Component={WidgetsPage} />
    <AuthorizedRoute path="users" Component={UsersPage} getData={getUsersPageData} />
    <AuthorizedRoute getData={getInvitesPageData} path="invites" Component={InvitesPage} />
  </Route>,
);

const render = createRender({
  renderError: ({ error }) => {
    console.log(error.status);
    switch (error.status) {
      case 404:
        return <div>Not found</div>;
      case 401:
        return <LoginPage />;
      default:
        return null;
    }
  },
});

const Router = createConnectedRouter({
  render,
});

export default hot(module)(Router);
