const routes = {
  userProfileUrl(id) {
    return `/users/${id}`;
  },
  usersPage() {
    return `/users`;
  },
  invitesPage() {
    return `/invites`;
  },
  loginPage() {
    return `/`;
  },
};

export default routes;
