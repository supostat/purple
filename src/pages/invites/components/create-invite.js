import React, { Component } from 'react';
import oFetch from 'o-fetch';
import InviteForm from './invite-form';

export default class CreateInvite extends Component {
  render() {
    const initialValues = {
      firstName: null,
      surname: null,
      role: null,
      email: null,
      venues: [],
    };

    const [rolesOptions, venues, onSubmit] = oFetch(this.props, 'rolesOptions', 'venues', 'onSubmit');

    return <InviteForm initialValues={initialValues} onSubmit={onSubmit} venues={venues} rolesOptions={rolesOptions} />;
  }
}
