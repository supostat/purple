const { BASE_API_URL } = process.env;
console.log('BASE_API_URL: ', BASE_API_URL);
export default {
  baseApiUrl: BASE_API_URL,
  loginApiUrl: `${BASE_API_URL}/login`,
  logoutApiUrl: `${BASE_API_URL}/logout`,
  acceptInvitePageDataApiUrl(invitationToken) {
    return `${BASE_API_URL}/api/v1/accept_invites?invitationToken=${invitationToken}`;
  },
  invitesPageDataApiUrl: `${BASE_API_URL}/api/v1/invites`,
  acceptInviteApiUrl: `${BASE_API_URL}/api/v1/accept_invites/accept`,
};
