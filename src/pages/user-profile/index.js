import React, { Component } from 'react';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import { getUser } from './redux/selectors';
import { DetailsList, DetailsListItem, CollapsibleBoard } from '~/components';
import { UserDetailsWrapper, UserDetailsBlock, UserProfileHeader, UserHistory } from './components';
import AuthorizedLayout from '~/layouts/authorized-layout';
import * as constants from '~/constants';

export class UserProfile extends Component {
  render() {
    const user = oFetch(this.props, 'user');
    const [fullName, email, roleTitle, status, venues] = oFetch(
      user,
      'fullName',
      'email',
      'roleTitle',
      'status',
      'venues',
    );
    return (
      <AuthorizedLayout headerRenderer={() => <UserProfileHeader user={user} onDisableClick={() => {}} />}>
        <UserDetailsWrapper>
          <UserDetailsBlock number="1" title="Personal Details">
            <DetailsList>
              <DetailsListItem title="Name" value={fullName} />
              <DetailsListItem title="Email Address" value={email} />
            </DetailsList>
          </UserDetailsBlock>
          <UserDetailsBlock number="2" title="Access Details">
            <DetailsList>
              <DetailsListItem title="Role" value={roleTitle} />
              <DetailsListItem title="Venue Access" value={venues} />
            </DetailsList>
          </UserDetailsBlock>
          <UserDetailsBlock number="3" title="Account Details">
            <DetailsList>
              <DetailsListItem title="Status" value={constants.USER_STATUSES[status]} />
            </DetailsList>
          </UserDetailsBlock>
          <UserDetailsBlock number="4" title="Two Factor Auth Details">
            <span>???</span>
          </UserDetailsBlock>
        </UserDetailsWrapper>
        <CollapsibleBoard title="Change History">
          <div className="purple-panel purple-panel_role_manager">
            <h1>Filter</h1>
          </div>
        </CollapsibleBoard>
      </AuthorizedLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUser(state),
  };
};

export default connect(mapStateToProps)(UserProfile);

export { getUserProfilePageData } from './redux/actions';
export { default as userProfileReducer } from './redux/reducers';
