import store from 'store';

const JWT_TOKEN_KEY = 'jwtToken';

export default {
  isAuthenticated() {
    return !!store.get(JWT_TOKEN_KEY);
  },
  getJwtToken() {
    return store.get(JWT_TOKEN_KEY) || null;
  },
  setJwtToken(jwtToken) {
    return store.set(JWT_TOKEN_KEY, jwtToken);
  },
  clearJwtToken() {
    return store.remove(JWT_TOKEN_KEY);
  },
};
