import React, { Component } from 'react';
import oFetch from 'o-fetch';
import successImage from '~/assets/images/illustration-check-accent-green.svg';
import { Button } from '~/components';

export default class SuccessPage extends Component {
  render() {
    const [title, text, buttonText, onButtonClick] = oFetch(this.props, 'title', 'text', 'buttonText', 'onButtonClick');
    return (
      <div className="purple-modal purple-modal_size_m-minor purple-modal_space_m">
        <div className="purple-modal__content purple-modal__content_justify_center">
          <div className="purple-modal__group">
            <img src={successImage} alt="success" className="purple-modal__image" />
            <h2 className="purple-modal__title purple-modal__title_size_l">
              <span className="purple-modal__title-bold">{title}</span>
            </h2>
            <p className="purple-modal__subtitle">{text}</p>
          </div>
          <div className="purple-modal__actions">
            <Button
              onClick={onButtonClick}
              text={buttonText}
              className="purple-button purple-button_color_accent-primary purple-button_size_l purple-modal__action"
            />
          </div>
        </div>
      </div>
    );
  }
}
