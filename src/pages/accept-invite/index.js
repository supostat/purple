import React, { Component } from 'react';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import NotAuthorizedLayout from '../../layouts/not-authorized-layout';
import { AcceptInviteSingleForm } from './components';
import { acceptInvintation } from './redux/actions';

export { getAcceptInvintationPageData, acceptInvintation } from './redux/actions';

class AcceptInvitePage extends Component {
  render() {
    const handleAcceptInvintation = oFetch(this.props, 'handleAcceptInvintation');
    const payload = oFetch(this.props, 'data.payload');
    const invitationToken = oFetch(this.props, 'params.invitationToken');
    const TFOQRCode = oFetch(payload, 'base64Png');
    const invitedUser = oFetch(payload, 'invitedUser');
    const initialValues = {
      password: null,
      passwordConfirmation: null,
      authCode: null,
      invitationToken,
    };

    return (
      <NotAuthorizedLayout>
        <AcceptInviteSingleForm
          invitedUser={invitedUser}
          TFOQRCode={TFOQRCode}
          onSubmit={handleAcceptInvintation}
          initialValues={initialValues}
        />
      </NotAuthorizedLayout>
    );
  }
}

const mapDispatchToProps = {
  handleAcceptInvintation: acceptInvintation,
};

export default connect(
  null,
  mapDispatchToProps,
)(AcceptInvitePage);
