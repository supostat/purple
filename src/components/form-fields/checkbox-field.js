// @flow
import * as React from 'react';
import type { FieldRenderProps } from 'react-final-form';

type Props = {
  input: FieldRenderProps.input,
  text: string,
};

class CheckboxField extends React.Component<Props> {
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
      input: { name, onChange, value },
      text,
    } = this.props;

    return (
      <div className="purple-form__field">
        <div className="purple-form-checkbox">
          <label htmlFor={name} className="purple-form-checkbox__input-label">
            <input
              id={name}
              name={name}
              onChange={onChange}
              checked={value}
              className="purple-form-checkbox__input"
              type="checkbox"
            />
            <span className="purple-form-checkbox__input-label-text">{text}</span>
          </label>
        </div>
      </div>
    );
  }
}

export default CheckboxField;
