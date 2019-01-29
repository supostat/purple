import React, { Component } from 'react';
import oFetch from 'o-fetch';

export default class UserDetailsBlock extends Component {
  renderButton = () => {
    const buttonRenderer = oFetch(this.props, 'buttonRenderer');
    if (buttonRenderer === null) {
      return null;
    }
    return React.cloneElement(buttonRenderer());
  };

  render() {
    const [number, title, children] = oFetch(this.props, 'number', 'title', 'children');
    return (
      <div className="purple-overview__flow-item purple-overview__flow-item_size_half">
        <div className="purple-details">
          <p className="purple-details__pointer">
            <span className="purple-details__pointer-text">{number}</span>
          </p>
          <div className="purple-details__content">
            <div className="purple-details__header">
              <h3 className="purple-details__title">{title}</h3>
              {this.renderButton()}
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

UserDetailsBlock.defaultProps = {
  buttonRenderer: null,
};
