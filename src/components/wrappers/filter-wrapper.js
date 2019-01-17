import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import cn from 'classnames';

export default class FilterWrapper extends Component {
  state = {
    isOpened: false,
  };

  toggleFilter = () => {
    this.setState(state => ({ isOpened: !state.isOpened }));
  };

  render() {
    const { children } = this.props;
    const { isOpened } = this.state;
    const toggleFilterClass = cn('purple-collapsible__label purple-collapsible__label_role_filter', {
      'purple-collapsible__label_state_closed': !isOpened,
    });
    return (
      <div className="purple-page-main__filter">
        <div className="purple-collapsible">
          <div className="purple-collapsible__header">
            <button onClick={this.toggleFilter} type="button" className={toggleFilterClass}>
              Filter
            </button>
          </div>
          <Collapse isOpened={isOpened} className="purple-collapsible__content">
            <div className="purple-collapsible__inner">{children}</div>
          </Collapse>
        </div>
      </div>
    );
  }
}
