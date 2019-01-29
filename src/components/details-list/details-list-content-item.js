import React, { PureComponent } from 'react';
import oFetch from 'o-fetch';

export default class DetailsListContentItem extends PureComponent {
  render() {
    const [title, children] = oFetch(this.props, 'title', 'children');
    return (
      <li className="purple-details__item">
        <div className="purple-details__key">
          <p className="purple-details__text">
            <span className="purple-details__text-bold">{title}</span>
          </p>
        </div>
        <div className="purple-details__value">{children}</div>
      </li>
    );
  }
}
