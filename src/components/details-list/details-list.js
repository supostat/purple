import React, { PureComponent } from 'react';
import oFetch from 'o-fetch';

export default class DetailsList extends PureComponent {
  render() {
    const children = oFetch(this.props, 'children');
    return <ul className="purple-details__list">{children}</ul>;
  }
}
