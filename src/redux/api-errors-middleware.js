import { HttpError } from 'found';
import AuthService from '~/utils/auth-service';
import { showNotification } from '~/components/notification';

export default store => next => action => {
  if (action.meta && action.meta.message) {
    const type = action.error === true ? 'error' : 'success';
    showNotification({ text: action.meta.message, type, position: 'topCenter' });
  }
  if (action.payload && action.payload.name === 'ApiError') {
    const { status } = action.payload;
    switch (status) {
      case 404:
        throw new HttpError(404);
      case 403:
        showNotification({ text: 'This action is not permitted', type: 'error', position: 'topCenter' });
        throw new HttpError(403);
      case 401:
        AuthService.clearJwtToken();
        throw new HttpError(401);
      default:
        return next(action);
    }
  }
  return next(action);
};
