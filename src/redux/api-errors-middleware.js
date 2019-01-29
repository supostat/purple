import { RSAA } from 'redux-api-middleware';
import { Actions as FarceActions } from 'farce';
import { HttpError } from 'found';
import AuthService from '~/utils/auth-service';

export default store => next => action => {
  if (action.payload && action.payload.name === 'ApiError') {
    const { status } = action.payload;
    switch (status) {
      case 404:
        return next(action);
      case 401:
        // AuthService.clearJwtToken();
        throw new HttpError(401);
      default:
        return next(action);
    }
  }
  return next(action);
};
