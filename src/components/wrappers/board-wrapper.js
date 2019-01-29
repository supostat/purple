import React, { Component } from 'react';
import oFetch from 'o-fetch';

export default class BoardWrapper extends Component {
  render() {
    const children = oFetch(this.props, 'children');
    return (
      <div className="purple-board">
        <div className="purple-board__inner">{children}</div>
      </div>
    );
  }
}
