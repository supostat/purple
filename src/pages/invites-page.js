import React, { Component } from 'react';
import Link from 'found/lib/Link';
import { connect } from 'react-redux';
import oFetch from 'o-fetch';
import AuthorizedLayout from '../layouts/authorized-layout';
import { openContentModal } from '~/components/UI/modals';
import { InvitesHeader, DesktopInvitersList, DesktopInviterItem, InviteForm } from '~/components/invites';

class InvitesPage extends Component {
  handleSubmit = (handleClose, values) => {
    console.log(values);
  };

  handleNewInviteModalOpen = () => {
    openContentModal({
      onSubmit: this.handleSubmit,
      title: 'Invite New User',
      props: {
        initialValues: {
          firstName: null,
          surname: null,
          role: null,
          email: null,
        },
      },
    })(InviteForm);
  };

  render() {
    return (
      <AuthorizedLayout headerRenderer={() => <InvitesHeader onNewInviteClick={this.handleNewInviteModalOpen} />}>
        <div className="purple-board">
          <div className="purple-board__inner">
            <DesktopInvitersList inviters={[]} inviterRenderer={inviter => <DesktopInviterItem inviter={inviter} />} />
          </div>
        </div>
      </AuthorizedLayout>
    );
  }
}

export default connect(
  null,
  null,
)(InvitesPage);
