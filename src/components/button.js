import React, { Component } from 'react';
import AsyncButton from 'react-async-button';
import oFetch from 'o-fetch';

export default class Button extends Component {
  render() {
    const [
      text,
      pendingText,
      fulFilledText,
      rejectedText,
      loadingClass,
      fulFilledClass,
      rejectedClass,
      onClick,
      className,
    ] = oFetch(
      this.props,
      'text',
      'pendingText',
      'fulFilledText',
      'rejectedText',
      'loadingClass',
      'fulFilledClass',
      'rejectedClass',
      'onClick',
      'className',
    );
    return (
      <AsyncButton
        className={className}
        text={text}
        pendingText={pendingText}
        fulFilledText={fulFilledText}
        rejectedText={rejectedText}
        loadingClass={loadingClass}
        fulFilledClass={fulFilledClass}
        rejectedClass={rejectedClass}
        onClick={onClick}
      >
        {({ buttonText }) => <span className="purple-button__text">{buttonText}</span>}
      </AsyncButton>
    );
  }
}

Button.defaultProps = {
  className: 'purple-button purple-button_size_l purple-button_color_accent-primary purple-button_size_full-xs',
  pendingText: null,
  fulFilledText: null,
  rejectedText: null,
  loadingClass: null,
  fulFilledClass: null,
  rejectedClass: null,
};
