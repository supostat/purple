// @flow
import * as React from 'react';
import type { FieldRenderProps } from 'react-final-form';
import cn from 'classnames';

type Props = {
  input: FieldRenderProps.input,
  meta: FieldRenderProps.meta,
  placeholder?: string,
  label?: string,
  type?: string,
};

class InputField extends React.Component<Props> {
  static defaultProps = {
    type: 'text',
    label: null,
    placeholder: null,
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    const {
      input: { onChange },
    } = this.props;
    onChange(value === '' ? null : value);
  };

  render() {
    const {
      input: { name, value },
      meta: { error, submitError, touched },
      label,
      placeholder,
      type,
    } = this.props;

    const hasError = error || submitError;
    const inputFormFieldClassNames = cn('purple-form-field__input', { 'purple-form-field_state_error': hasError });

    return (
      <div className="purple-form__field">
        <div className="purple-form-field">
          {label && (
            <p className="purple-form-field__label">
              <span className="purple-form-field__label-text">{label}</span>
            </p>
          )}
          <div className={inputFormFieldClassNames}>
            <input value={value} name={name} onChange={this.onChange} type={type} placeholder={placeholder} />
          </div>
          {(error || submitError) && (
            <div className="purple-form-error purple-form-error_position_below">
              <p className="purple-form-error__text">{error || submitError}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default InputField;
