import { HttpError } from 'found';
import { getSafe, AuthService } from '~/utils';
import { showNotification } from '~/components/notification';

export default store => next => action => {
  if (action.meta && action.meta.message) {
    const type = action.error === true ? 'error' : 'success';
    showNotification({ text: action.meta.message, type, position: 'topCenter' });
  }
  if (action.payload && action.payload.name === 'ApiError') {
    const { status } = action.payload;
    if (status >= 500) {
      return next(action);
    }
    switch (status) {
      case 404: {
        throw new HttpError(404);
      }
      case 401: {
        const message = getSafe(() => action.payload.response.message) || 'You are not authorized to do this action';
        showNotification({
          text: `${message}`,
          type: 'error',
          position: 'topCenter',
        });
        AuthService.clearJwtToken();
        return next(action);
      }
      case 403: {
        const message = getSafe(() => action.payload.response.message) || 'This action is not permitted';
        showNotification({
          text: `${message}`,
          type: 'error',
          position: 'topCenter',
        });
        throw new HttpError(403);
      }
      default: {
        return next(action);
      }
    }
  }
  return next(action);
};
