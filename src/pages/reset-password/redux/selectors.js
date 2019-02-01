import oFetch from 'o-fetch';

export const showSuccessSelector = state => oFetch(state, 'resetPasswordPage.ui.showSuccess');
