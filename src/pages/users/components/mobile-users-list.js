import React, { Component } from 'react';
import oFetch from 'o-fetch';

export default class MobileUsersList extends Component {
  renderList = users => {
    const itemRenderer = oFetch(this.props, 'itemRenderer');
    return users.map(user => {
      const userId = oFetch(user, 'id');
      return React.cloneElement(itemRenderer(user), {
        key: userId,
      });
    });
  };

  render() {
    const users = oFetch(this.props, 'users');
    return this.renderList(users);
  }
}
