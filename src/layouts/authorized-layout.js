import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import { AppHeader } from '../components/UI';
import { getAuthUser } from '~/redux/selectors';
import { userLogout } from '~/redux/actions/auth-user';

class AuthorizedLayout extends Component {
  render() {
    const [children, authUser, handleUserLogout] = oFetch(this.props, 'children', 'authUser', 'handleUserLogout');
    const { headerRenderer } = this.props;
    return (
      <Fragment>
        <AppHeader onLogout={handleUserLogout} user={authUser} />
        <main className="purple-page-main">
          {headerRenderer && headerRenderer()}
          <div className="purple-page-main__content">
            <div className="purple-page-main__inner">{children}</div>
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authUser: getAuthUser(state),
});

export default connect(
  mapStateToProps,
  { handleUserLogout: userLogout },
)(AuthorizedLayout);
