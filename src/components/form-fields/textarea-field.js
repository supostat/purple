import * as React from 'react';
import oFetch from 'o-fetch';
import { Textarea } from '~/components/fields';

class TextareaField extends React.Component {
  onChange = value => {
    const onChange = oFetch(this.props, 'input.onChange');
    onChange(value === '' ? null : value);
  };

  render() {
    const [input, meta, label, placeholder, fieldClassName] = oFetch(
      this.props,
      'input',
      'meta',
      'label',
      'placeholder',
      'fieldClassName',
    );
    const errors = meta.error || meta.submitError;

    return (
      <Textarea
        value={input.value}
        errors={errors}
        label={label}
        name={input.name}
        onChange={this.onChange}
        placeholder={placeholder}
        fieldClassName={fieldClassName}
      />
    );
  }
}

TextareaField.defaultProps = {
  label: null,
  placeholder: null,
  fieldClassName: null,
};

export default TextareaField;
