import React, { PureComponent } from 'react';
import oFetch from 'o-fetch';

export default class DetailsListItem extends PureComponent {
  render() {
    const [title, value] = oFetch(this.props, 'title', 'value');
    return (
      <li className="purple-details__item">
        <div className="purple-details__key">
          <p className="purple-details__text">
            <span className="purple-details__text-bold">{title}</span>
          </p>
        </div>
        <div className="purple-details__value">
          <p className="purple-details__text">{value}</p>
        </div>
      </li>
    );
  }
}
