import oFetch from 'o-fetch';
const BASE_API_URL = oFetch(process.env, 'BASE_API_URL');

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
  userProfilePage: {
    userProfile: {
      method: 'GET',
      getPath(userId) {
        return `${BASE_API_URL}/api/v1/users/${userId}`;
      },
    },
    updatePersonalDetails: {
      method: 'POST',
      getPath(userId) {
        return `${BASE_API_URL}/api/v1/users/${userId}/update_personal_details`;
      },
    },
    updateAccessDetails: {
      method: 'POST',
      getPath(userId) {
        return `${BASE_API_URL}/api/v1/users/${userId}/update_access_details`;
      },
    },
    disableUser: {
      method: 'POST',
      getPath(userId) {
        return `${BASE_API_URL}/api/v1/users/${userId}/disable`;
      },
    },
    enableUser: {
      method: 'POST',
      getPath(userId) {
        return `${BASE_API_URL}/api/v1/users/${userId}/enable`;
      },
    },
    getUserHistory: {
      method: 'get',
      getPath(userId) {
        return `${BASE_API_URL}/api/v1/users/${userId}/history${location.search}`;
      },
    },
  },
  resetPasswordPage: {
    resetPassword: {
      method: 'POST',
      getPath() {
        return `${BASE_API_URL}/api/v1/passwords/reset_password`;
      },
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
      method: 'POST',
      getPath(invitedId) {
        return `${BASE_API_URL}/api/v1/invites/${invitedId}/revoke${location.search}`;
      },
    },
    loadMoreInvited: {
      method: 'GET',
      getPath() {
        return `${BASE_API_URL}/api/v1/invites${location.search}`;
      },
    },
  },
  usersPage: {
    indexData: {
      method: 'GET',
      getPath() {
        return `${BASE_API_URL}/api/v1/users${location.search}`;
      },
    },
    loadMoreUsers: {
      method: 'GET',
      getPath() {
        return `${BASE_API_URL}/api/v1/users${location.search}`;
      },
    },
  },
  acceptInviteParams: {
    method: 'POST',
    getPath() {
      return `${BASE_API_URL}/api/v1/accept_invites/accept`;
    },
  },
};
