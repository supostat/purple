import React, { PureComponent } from 'react';
import oFetch from 'o-fetch';
import { Select } from '~/components/fields';

export default class SelectField extends PureComponent {
  render() {
    const [input, meta, label, placeholder, options, valueKey, labelKey, isMulti, fieldClassName, isClearable] = oFetch(
      this.props,
      'input',
      'meta',
      'label',
      'placeholder',
      'options',
      'valueKey',
      'labelKey',
      'isMulti',
      'fieldClassName',
      'isClearable',
    );
    const errors = meta.error || meta.submitError;
    return (
      <Select
        onChange={input.onChange}
        value={input.value}
        options={options}
        errors={errors}
        placeholder={placeholder}
        label={label}
        isClearable={isClearable}
        isMulti={isMulti}
        valueKey={valueKey}
        labelKey={labelKey}
        fieldClassName={fieldClassName}
      />
    );
  }
}

SelectField.defaultProps = {
  fieldClassName: null,
  label: null,
  placeholder: null,
  valueKey: 'value',
  labelKey: 'label',
  isClearable: false,
  isMulti: false,
};
