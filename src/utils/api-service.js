const { BASE_API_URL } = process.env;

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
  forgotPasswordPage: {
    sendResetPasswordEmail: {
      method: 'POST',
      getPath() {
        return `${BASE_API_URL}/api/v1/passwords/send_reset_password_email`;
      },
    },
  },
  invitesPage: {
    indexData: {
      method: 'GET',
      getPath() {
        return `${BASE_API_URL}/api/v1/invites${location.search}`;
      },
    },
    createInvite: {
      method: 'POST',
      getPath() {
        return `${BASE_API_URL}/api/v1/invites${location.search}`;
      },
    },
    revokeInvite: {
      method: 'DELETE',
      getPath(invitedId) {
        return `${BASE_API_URL}/api/v1/invites/${invitedId}${location.search}`;
      },
    },
    loadMoreInvited: {
      method: 'GET',
      getPath() {
        return `${BASE_API_URL}/api/v1/invites${location.search}`;
      },
    },
  },
  usersPageDataParams: {
    method: 'GET',
    getPath() {
      return `${BASE_API_URL}/api/v1/users`;
    },
  },
  userProfilePageDataParams: {
    method: 'GET',
    getPath(id) {
      return `${BASE_API_URL}/api/v1/users/${id}`;
    },
  },
  userProfileHistoryParams: {
    method: 'GET',
    getPath(id) {
      return `${BASE_API_URL}/api/v1/users/${id}/history`;
    },
  },
  acceptInviteParams: {
    method: 'POST',
    getPath() {
      return `${BASE_API_URL}/api/v1/accept_invites/accept`;
    },
  },
};
