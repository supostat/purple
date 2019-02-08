import React, { Component } from 'react';
import NotAuthorizedLayout from '~/layouts/not-authorized-layout';

export default function wrapper(WrappedComponent) {
  return class Wrapper extends Component {
    render() {
      return (
        <NotAuthorizedLayout>
          <WrappedComponent {...this.props} />
        </NotAuthorizedLayout>
      );
    }
  };
}
