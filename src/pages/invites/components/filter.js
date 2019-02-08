import React, { Component } from 'react';
import oFetch from 'o-fetch';
import FilterForm from './filter-form';
import { FilterWrapper } from '~/components/wrappers';

export default class Filter extends Component {
  render() {
    const [initialFilterData, onFilter, venues] = oFetch(this.props, 'initialFilterData', 'onFilter', 'venues');

    return (
      <FilterWrapper>
        <FilterForm initialValues={initialFilterData} onSubmit={onFilter} venues={venues} />
      </FilterWrapper>
    );
  }
}
