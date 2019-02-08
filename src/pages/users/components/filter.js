import React, { Component } from 'react';
import oFetch from 'o-fetch';
import FilterForm from './filter-form';
import { FilterWrapper } from '~/components/wrappers';

export default class Filter extends Component {
  render() {
    const onFilter = oFetch(this.props, 'onFilter');

    return (
      <FilterWrapper>
        <FilterForm onSubmit={onFilter} />
      </FilterWrapper>
    );
  }
}
