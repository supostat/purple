import { RSAA } from 'redux-api-middleware';
import AuthService from '~/utils/auth-service';

export default () => next => action => {
  const callApi = action[RSAA];
  if (callApi) {
    const { body } = callApi;
    callApi.headers = { ...callApi.headers, 'Content-Type': 'application/json' };
    if (body !== undefined) {
      callApi.body = JSON.stringify(body);
    }
    const jwtToken = AuthService.getJwtToken();
    if (jwtToken) {
      callApi.headers = { ...callApi.headers, Authorization: `Bearer ${jwtToken}` };
    }
  }

  return next(action);
};
