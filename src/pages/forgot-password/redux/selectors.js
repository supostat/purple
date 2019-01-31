import oFetch from 'o-fetch';

export const showAlmostDoneSelector = state => oFetch(state, 'forgotPasswordPage.ui.showAlmostDone');
