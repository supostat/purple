import React from 'react';
import ReactDOM from 'react-dom';
import { resolver } from 'found';
import { Provider } from 'react-redux';
import FarceActions from 'farce/lib/Actions';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import './styles.css';
import '~/assets/sass/index.sass';

import configureStore from './redux/configure-store';
import Router from './router';

const store = configureStore();
store.dispatch(FarceActions.init());

const rootEl = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router matchContext={{ store }} resolver={resolver} />
  </Provider>,
  rootEl,
);
