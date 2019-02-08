import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import oFetch from 'o-fetch';
import { InputField, SelectField } from '~/components/form-fields';
import { getRolesOptions, getStatusesOptions, getInitialFilterData } from '../redux/selectors';

class FilterForm extends Component {
  render() {
    const [onSubmit, rolesOptions, statusesOptions, initialFilterData] = oFetch(
      this.props,
      'onSubmit',
      'rolesOptions',
      'statusesOptions',
      'initialFilterData',
    );
    return (
      <Form initialValues={initialFilterData} onSubmit={onSubmit}>
        {({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit} className="purple-form" noValidate>
              <div className="purple-form__row">
                <Field
                  name="name"
                  label="Name"
                  type="text"
                  fieldClassName="purple-form__field_size_half"
                  component={InputField}
                  placeholder="Name"
                />
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  fieldClassName="purple-form__field_size_half purple-form__field_position_last"
                  component={InputField}
                  placeholder="Email"
                />
              </div>
              <div className="purple-form__row">
                <Field
                  name="status"
                  label="Status"
                  options={statusesOptions}
                  fieldClassName="purple-form__field_size_half"
                  component={SelectField}
                  placeholder="Status"
                  isClearable
                />
                <Field
                  name="role"
                  label="Role"
                  options={rolesOptions}
                  fieldClassName="purple-form__field_size_half purple-form__field_position_last"
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
    initialFilterData: getInitialFilterData(state),
  };
};

export default connect(mapStateToProps)(FilterForm);
