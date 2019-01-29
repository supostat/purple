import React, { Component } from 'react';
import oFetch from 'o-fetch';

export default class TableCell extends Component {
  render() {
    const children = oFetch(this.props, 'children');
    return (
      <div className="purple-table__cell">
        <div className="purple-table__info">{children}</div>
      </div>
    );
  }
}
