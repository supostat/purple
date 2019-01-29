import React, { PureComponent } from 'react';
import ReactSelect from 'react-select';
import SimpleValue from '~/lib/react-select-simple-value';
import oFetch from 'o-fetch';
import cn from 'classnames';

export default class Select extends PureComponent {
  handleChange = selectedValue => {
    const [isMulti, onChange, valueKey] = oFetch(this.props, 'isMulti', 'onChange', 'valueKey');
    if (selectedValue === null) {
      return onChange(null);
    }
    if (isMulti) {
      const valuesArray = selectedValue.map(value => {
        return value[valueKey];
      });
      return onChange(valuesArray);
    }
    return onChange(selectedValue[valueKey]);
  };

  render() {
    const [
      name,
      value,
      label,
      onBlur,
      onFocus,
      placeholder,
      selectClass,
      options,
      errors,
      valueKey,
      labelKey,
      isMulti,
      fieldClassName,
      isClearable,
    ] = oFetch(
      this.props,
      'name',
      'value',
      'label',
      'onBlur',
      'onFocus',
      'placeholder',
      'selectClass',
      'options',
      'errors',
      'valueKey',
      'labelKey',
      'isMulti',
      'fieldClassName',
      'isClearable',
    );

    const hasErrors = errors && errors.length > 0;
    const selectClassNames = cn('purple-form-select', { 'purple-form-select_state_error': hasErrors });
    const selectFieldClassNames = cn('purple-form-select__component', selectClass);
    const fieldClassNames = cn('purple-form__field', fieldClassName);
    return (
      <div className={fieldClassNames}>
        <div className="purple-form-field">
          <div className={selectClassNames}>
            {label && (
              <p className="purple-form-select__label">
                <span className="purple-form-select__label-text">{label}</span>
              </p>
            )}
            <div className={selectFieldClassNames}>
              <SimpleValue isMulti={isMulti} options={options} value={value} getOptionValue={opt => opt[valueKey]}>
                {({ value: selectedValue }) => {
                  return (
                    <ReactSelect
                      options={options}
                      value={selectedValue}
                      name={name}
                      isMulti={isMulti}
                      onChange={this.handleChange}
                      getOptionValue={opt => opt[valueKey]}
                      getOptionLabel={opt => opt[labelKey]}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      isClearable={isClearable}
                      placeholder={placeholder}
                      className={selectClassNames}
                      classNamePrefix="react-select"
                    />
                  );
                }}
              </SimpleValue>
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
      </div>
    );
  }
}

Select.defaultProps = {
  name: null,
  placeholder: '',
  selectClass: null,
  fieldClassName: null,
  label: null,
  errors: null,
  valueKey: 'value',
  labelKey: 'label',
  isMulti: false,
  isClearable: false,
  onBlur: () => {},
  onFocus: () => {},
};
