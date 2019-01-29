import React, { Component, Fragment } from 'react';
import oFetch from 'o-fetch';
import { Button } from '~/components';

export default class WithLoadMore extends Component {
  render() {
    const [children, pagination, onLoadMore] = oFetch(this.props, 'children', 'pagination', 'onLoadMore');
    const [count, showing, showLoadMore] = oFetch(pagination, 'count', 'showing', 'showLoadMore');
    return (
      <Fragment>
        {children}
        <p className="purple-board__counter purple-board__counter_position_above">
          Showing <span className="purple-board__counter-bold">{showing}</span> of{' '}
          <span className="purple-board__counter-bold">{count}</span>
        </p>
        {showLoadMore && (
          <div className="purple-board__actions">
            <Button
              className="purple-button purple-button_size_m purple-button_border_accent-blue purple-button_size_full-xs purple-board__action"
              type="button"
              text="Load More"
              onClick={onLoadMore}
            />
          </div>
        )}
      </Fragment>
    );
  }
}
