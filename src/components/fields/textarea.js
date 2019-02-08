import React, { Component } from 'react';
import oFetch from 'o-fetch';
import cn from 'classnames';

export default class Textarea extends Component {
  handleChange = ({ target: { value } }) => {
    const onChange = oFetch(this.props, 'onChange');
    onChange(value);
  };

  render() {
    const [name, value, label, onBlur, onFocus, placeholder, errors, fieldClassName] = oFetch(
      this.props,
      'name',
      'value',
      'label',
      'onBlur',
      'onFocus',
      'placeholder',
      'errors',
      'fieldClassName',
    );

    const hasErrors = errors && errors.length > 0;

    const textareaFieldClassNames = cn(
      'purple-form-textarea',
      {
        'purple-form-textarea_state_error': hasErrors,
      },
      fieldClassName,
    );

    return (
      <div className="purple-form__field">
        <div className={textareaFieldClassNames}>
          {label && (
            <label htmlFor={name} className="purple-form-textarea__label">
              <span className="purple-form-textarea__label-text">{label}</span>
            </label>
          )}
          <div className="purple-form-textarea__input">
            <textarea
              onChange={this.handleChange}
              value={value}
              onBlur={onBlur}
              onFocus={onFocus}
              name={name}
              id={name}
              placeholder={placeholder}
            />
          </div>
          {errors && (
            <div className="purple-form-error purple-form-error_position_below">
              {errors.map((error, index) => (
                <p key={index} className="purple-form-error__text">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Textarea.defaultProps = {
  name: null,
  placeholder: '',
  label: null,
  errors: null,
  fieldClassName: null,
  onBlur: () => {},
  onFocus: () => {},
};
