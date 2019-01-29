import * as React from 'react';
import cn from 'classnames';
import oFetch from 'o-fetch';
import { Input } from '~/components/fields';

class InputField extends React.Component {
  onChange = value => {
    const onChange = oFetch(this.props, 'input.onChange');
    onChange(value === '' ? null : value);
  };

  render() {
    const [input, meta, label, placeholder, type, fieldClassName] = oFetch(
      this.props,
      'input',
      'meta',
      'label',
      'placeholder',
      'type',
      'fieldClassName',
    );
    const errors = meta.error || meta.submitError;

    return (
      <Input
        value={input.value}
        errors={errors}
        label={label}
        name={input.name}
        onChange={this.onChange}
        type={type}
        placeholder={placeholder}
        fieldClassName={fieldClassName}
      />
    );
  }
}

InputField.defaultProps = {
  type: 'text',
  label: null,
  placeholder: null,
  fieldClassName: null,
};

export default InputField;
