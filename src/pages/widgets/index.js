import React, { Component } from 'react';
import AuthorizedLayout from '~/layouts/authorized-layout';

class WidgetsPage extends Component {
  render() {
    return (
      <AuthorizedLayout>
        <h1>Widgets!!!!</h1>
      </AuthorizedLayout>
    );
  }
}

export default WidgetsPage;
