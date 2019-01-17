import React, { Component } from 'react';
import Link from 'found/lib/Link';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import NotAuthorizedLayout from '../layouts/not-authorized-layout';
import AcceptInviteSingleForm from '../components/accept-invite/accept-invite-single-form';
import AcceptInviteForm from '../components/accept-invite/accept-invite-form';
import { acceptInvintation } from '../redux/actions/accept-invite-page';

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
