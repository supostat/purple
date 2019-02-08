import React, { Component, Fragment } from 'react';
import oFetch from 'o-fetch';

export default class AuthorizedLayout extends Component {
  render() {
    const children = oFetch(this.props, 'children');
    const { headerRenderer } = this.props;
    return (
      <Fragment>
        <main className="purple-page-main">
          {headerRenderer && headerRenderer()}
          <div className="purple-page-main__content">
            <div className="purple-page-main__inner">{children}</div>
          </div>
        </main>
      </Fragment>
    );
  }
}
