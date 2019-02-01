import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunkMiddleware from 'redux-thunk';
import foundReducer from 'found/lib/foundReducer';
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createQueryMiddleware from 'farce/lib/createQueryMiddleware';
import Matcher from 'found/lib/Matcher';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';
import queryString from 'query-string';
import apiBeforeInjector from './api-before-injector';
import apiErrorsMiddleware from './api-errors-middleware';

import globalReducer from './reducers';
import { routeConfig } from '../router';
import { usersPageReducers } from '~/pages/users';
import { userProfileReducer } from '~/pages/user-profile';
import { invitesReducers } from '~/pages/invites';
import { forgotPasswordReducers } from '~/pages/forgot-password';
import { resetPasswordReducers } from '~/pages/reset-password';

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, apiBeforeInjector, apiMiddleware, apiErrorsMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const queryMiddleware = createQueryMiddleware({
    parse: query => queryString.parse(query, { arrayFormat: 'bracket' }),
    stringify: params => queryString.stringify(params, { arrayFormat: 'bracket' }),
  });
  const historyEnhancer = createHistoryEnhancer({
    protocol: new BrowserProtocol(),
    middlewares: [queryMiddleware],
  });
  const matchEnhancer = createMatchEnhancer(new Matcher(routeConfig));

  const enhancers = [middlewareEnhancer, historyEnhancer, matchEnhancer];
  const composedEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const reducers = combineReducers({
    found: foundReducer,
    global: globalReducer,
    usersPage: usersPageReducers,
    userProfilePage: userProfileReducer,
    invitesPage: invitesReducers,
    forgotPasswordPage: forgotPasswordReducers,
    resetPasswordPage: resetPasswordReducers,
  });
  const store = createStore(reducers, preloadedState, composedEnhancers(...enhancers));

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducers));
  }

  return store;
}
