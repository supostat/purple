import React, { Component } from 'react';
import oFetch from 'o-fetch';
import { Input, Select } from '~/components/fields';
import { Button } from '~/components';

const options = [
  {
    value: 1,
    label: 'Igor Pugachev',
  },
  {
    value: 2,
    label: 'William Billington',
  },
];

const roles = [{ value: 'admin', label: 'Admin' }];

export default class UsersFilter extends Component {
  state = {
    name: '',
    email: '',
    status: null,
    role: null,
  };

  handleRoleChange = value => {
    this.setState({ role: value });
  };

  handleStatusChange = value => {
    this.setState({ status: value });
  };

  handleNameChange = value => {
    this.setState({ name: value });
  };

  handleEmailChange = value => {
    this.setState({ email: value });
  };

  handleFilter = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('123');
      }, 3000);
    });
  };

  render() {
    const [name, email, status, role] = oFetch(this.state, 'name', 'email', 'status', 'role');
    return (
      <div className="purple-form">
        <div className="purple-form__row">
          <div className="purple-form__field purple-form__field_size_half">
            <Input name="name" label="Name" value={name} onChange={this.handleNameChange} />
          </div>
          <div className="purple-form__field purple-form__field_size_half purple-form__field_position_last">
            <Input name="email" label="Email" value={email} type="email" onChange={this.handleEmailChange} />
          </div>
        </div>
        <div className="purple-form__row">
          <div className="purple-form__field purple-form__field_size_half">
            <Select
              name="status"
              options={options}
              value={status}
              label="Status"
              placeholder="Select status ..."
              onChange={this.handleStatusChange}
            />
          </div>
          <div className="purple-form__field purple-form__field_size_half purple-form__field_position_last">
            <Select
              name="role"
              options={roles}
              value={role}
              label="Role"
              placeholder="Select role ..."
              onChange={this.handleRoleChange}
            />
          </div>
        </div>
        <div className="purple-form__field purple-form__field_size_min purple-form__field_justify_end purple-form__field_position_last">
          <Button text="Filter" pendingText="Processing ..." onClick={this.handleFilter} />
        </div>
      </div>
    );
  }
}
