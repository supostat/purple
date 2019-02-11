import { HttpError } from 'found';
import oFetch from 'o-fetch';
import { AuthService, getSafe } from '~/utils';
import { showNotification } from '~/components/notification';
import { getAuthUser } from './selectors';

export default store => next => action => {
  if (action.meta && action.meta.message) {
    const type = action.error === true ? 'error' : 'success';
    showNotification({ text: action.meta.message, type, position: 'topCenter' });
  }
  if (action.payload && action.payload.name === 'ApiError') {
    const { status } = action.payload;
    switch (status) {
      case 404: {
        throw new HttpError(404);
      }
      case 403: {
        const message = getSafe(() => action.payload.response.message) || `This action is not permitted`;
        showNotification({
          text: `${message}`,
          type: 'error',
          position: 'topCenter',
        });
        throw new HttpError(403);
      }
      case 401: {
        AuthService.clearJwtToken();
        throw new HttpError(401);
      }
      default: {
        return next(action);
      }
    }
  }
  return next(action);
};
