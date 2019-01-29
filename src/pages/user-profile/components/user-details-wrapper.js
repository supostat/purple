import React, { Component } from 'react';
import { BoardWrapper } from '~/components/wrappers';
import oFetch from 'o-fetch';

export default class UserDetailsWrapper extends Component {
  render() {
    const children = oFetch(this.props, 'children');

    return (
      <BoardWrapper>
        <div className="purple-overview">
          <div className="purple-overview__flow">{children}</div>
        </div>
      </BoardWrapper>
    );
  }
}
