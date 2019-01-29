import React, { Component } from 'react';
import oFetch from 'o-fetch';
import cn from 'classnames';

export default class Input extends Component {
  handleChange = ({ target: { value } }) => {
    const onChange = oFetch(this.props, 'onChange');
    onChange(value);
  };

  render() {
    const [name, value, label, onBlur, onFocus, placeholder, type, errors, fieldClassName] = oFetch(
      this.props,
      'name',
      'value',
      'label',
      'onBlur',
      'onFocus',
      'placeholder',
      'type',
      'errors',
      'fieldClassName',
    );

    const hasErrors = errors && errors.length > 0;

    const inputFieldClassNames = cn(
      'purple-form__field',
      {
        'purple-form-field_state_error': hasErrors,
      },
      fieldClassName,
    );

    return (
      <div className={inputFieldClassNames}>
        <div className="purple-form-field">
          {label && (
            <p className="purple-form-field__label">
              <span className="purple-form-field__label-text">{label}</span>
            </p>
          )}
          <div className="purple-form-field__input">
            <input
              name={name}
              value={value}
              onChange={this.handleChange}
              onBlur={onBlur}
              onFocus={onFocus}
              type={type}
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

Input.defaultProps = {
  name: null,
  placeholder: '',
  type: 'text',
  label: null,
  errors: null,
  fieldClassName: null,
  onBlur: () => {},
  onFocus: () => {},
};
