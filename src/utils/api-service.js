const { BASE_API_URL } = process.env;

console.log('BASE_API_URL: ', BASE_API_URL);

export default {
  baseApiUrl: BASE_API_URL,
  loginParams: {
    method: 'POST',
    getPath() {
      return `${BASE_API_URL}/login`;
    },
  },
  logoutParams: {
    method: 'DELETE',
    getPath() {
      return `${BASE_API_URL}/logout`;
    },
  },
  acceptInvitePageDataParams: {
    method: 'GET',
    getPath(invitationToken) {
      return `${BASE_API_URL}/api/v1/accept_invites?invitationToken=${invitationToken}`;
    },
  },
  invitesPageDataParams: {
    method: 'GET',
    getPath() {
      return `${BASE_API_URL}/api/v1/invites`;
    },
  },
  usersPageDataParams: {
    method: 'GET',
    getPath() {
      return `${BASE_API_URL}/api/v1/users`;
    },
  },
  acceptInviteParams: {
    method: 'POST',
    getPath() {
      return `${BASE_API_URL}/api/v1/accept_invites/accept`;
    },
  },
};
