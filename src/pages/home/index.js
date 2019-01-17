import React, { Component, Fragment } from 'react';
import NotAuthorizedLayout from '~/layouts/not-authorized-layout';

class HomePage extends Component {
  render() {
    return (
      <NotAuthorizedLayout>
        <div>Hello I'm a home page</div>
      </NotAuthorizedLayout>
    );
  }
}

export default HomePage;
