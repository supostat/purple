import React, { Component, Fragment } from 'react';
import oFetch from 'o-fetch';
import { SimpleHeader } from '~/components';

export default class NotAuthorizedLayout extends Component {
  render() {
    const children = oFetch(this.props, 'children');
    return (
      <Fragment>
        <SimpleHeader />
        <main className="purple-page-main">
          <div className="purple-page-main__content">
            <div className="purple-page-main__inner">{children}</div>
          </div>
        </main>
      </Fragment>
    );
  }
}
