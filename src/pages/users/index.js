import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthorizedLayout from '~/layouts/authorized-layout';
import { UsersHeader } from './components';

export { getUsersPageData } from './redux/actions';
export reducers from './redux/reducers';

export class UsersPage extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  handleManageInvites = () => {
    console.log('manage invites clicked!');
  };

  render() {
    return (
      <AuthorizedLayout headerRenderer={() => <UsersHeader onManageInvitesClick={this.handleManageInvites} />}>
        <div />
      </AuthorizedLayout>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);
