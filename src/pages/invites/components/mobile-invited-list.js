import React, { Component } from 'react';
import oFetch from 'o-fetch';

function renderInvitersList(invitedUsers, invitedRenderer) {
  return invitedUsers.map(invited => {
    const id = oFetch(invited, 'id');
    return React.cloneElement(invitedRenderer(invited), {
      key: id,
    });
  });
}

export default class MobileInvitersList extends Component {
  render() {
    const [invitedUsers, invitedRenderer] = oFetch(this.props, 'invitedUsers', 'invitedRenderer');
    return renderInvitersList(invitedUsers, invitedRenderer);
  }
}
