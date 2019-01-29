import React, { Component } from 'react';
import oFetch from 'o-fetch';
import FilterForm from './filter-form';
import { FilterWrapper } from '~/components/wrappers';

export default class Filter extends Component {
  render() {
    const [initialFilterData, onFilter, rolesOptions, venues, invitationStatusesOptions] = oFetch(
      this.props,
      'initialFilterData',
      'onFilter',
      'rolesOptions',
      'venues',
      'invitationStatusesOptions',
    );

    return (
      <FilterWrapper>
        <FilterForm
          initialValues={initialFilterData}
          onSubmit={onFilter}
          rolesOptions={rolesOptions}
          venues={venues}
          invitationStatusesOptions={invitationStatusesOptions}
        />
      </FilterWrapper>
    );
  }
}
