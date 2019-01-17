import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunkMiddleware from 'redux-thunk';
import foundReducer from 'found/lib/foundReducer';
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import Matcher from 'found/lib/Matcher';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';

import apiAuthInjector from './api-auth-injector';
import apiErrorsMiddleware from './api-errors-middleware';

import rootReducer from './reducers';
import { routeConfig } from '../router';

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, apiAuthInjector, apiMiddleware, apiErrorsMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
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
    rootReducer,
  });
  const store = createStore(reducers, preloadedState, composedEnhancers(...enhancers));

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducers));
  }

  return store;
}
