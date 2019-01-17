import { RSAA } from 'redux-api-middleware';
import AuthService from '~/utils/auth-service';

export default () => next => action => {
  const callApi = action[RSAA];
  if (callApi) {
    const { headers } = callApi;
    const jwtToken = AuthService.getJwtToken();
    if (jwtToken) {
      callApi.headers = { ...headers, Authorization: `Bearer ${jwtToken}` };
    }
  }

  return next(action);
};
