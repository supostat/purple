import React, { Component, Fragment } from 'react';

class AppPage extends Component {
  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default AppPage;
