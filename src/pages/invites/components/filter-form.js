import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import oFetch from 'o-fetch';
import { connect } from 'react-redux';
import { InputField, SelectField } from '~/components/form-fields';
import { getRolesOptions, getStatusesOptions } from '../redux/selectors';

class FilterForm extends Component {
  render() {
    const [initialValues, rolesOptions, venues, statusesOptions, onSubmit] = oFetch(
      this.props,
      'initialValues',
      'rolesOptions',
      'venues',
      'statusesOptions',
      'onSubmit',
    );
    return (
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit} className="purple-form" noValidate>
              <Field
                name="venues"
                label="Venues"
                valueKey="id"
                labelKey="name"
                isMulti
                options={venues}
                component={SelectField}
                placeholder="Venues"
              />
              <div className="purple-form__row">
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  fieldClassName="purple-form__field_size_third"
                  component={InputField}
                  placeholder="Email"
                />
                <Field
                  name="status"
                  label="Status"
                  options={statusesOptions}
                  fieldClassName="purple-form__field_size_third"
                  component={SelectField}
                  placeholder="Status"
                  isClearable
                />
                <Field
                  name="role"
                  label="Role"
                  options={rolesOptions}
                  fieldClassName="purple-form__field_size_third purple-form__field_position_last"
                  component={SelectField}
                  placeholder="Role"
                  isClearable
                />
              </div>

              <div className="purple-form__field purple-form__field_size_min purple-form__field_justify_end purple-form__field_position_last">
                <button
                  type="submit"
                  disabled={submitting}
                  className="purple-button purple-button_size_l purple-button_color_accent-primary purple-button_size_full-xs"
                >
                  <span className="purple-button__text">Update</span>
                </button>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    rolesOptions: getRolesOptions(state),
    statusesOptions: getStatusesOptions(state),
  };
};

export default connect(mapStateToProps)(FilterForm);
