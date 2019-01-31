import React, { Component } from 'react';
import oFetch from 'o-fetch';
import warning from '~/assets/images/illustration-warning-accent-red.svg';

export default class WarningContent extends Component {
  render() {
    const title = oFetch(this.props, 'title');
    return (
      <div className="purple-modal__content purple-modal__content_justify_center">
        <div className="purple-modal__group">
          <img src={warning} alt="warning" className="purple-modal__image" />
          <p className="purple-modal__subtitle purple-modal__subtitle_size_l">
            <span className="purple-modal__subtitle-bold">{title}</span>
          </p>
        </div>
      </div>
    );
  }
}
