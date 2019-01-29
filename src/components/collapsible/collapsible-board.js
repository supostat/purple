import React, { PureComponent } from 'react';
import { Collapse } from 'react-collapse';
import oFetch from 'o-fetch';
import cn from 'classnames';

export default class CollapsibleBoard extends PureComponent {
  state = {
    isCollapsed: false,
  };

  toggleCollapse = () => {
    this.setState(state => ({ isCollapsed: !state.isCollapsed }));
  };

  render() {
    const [title, children] = oFetch(this.props, 'title', 'children');
    const isCollapsed = oFetch(this.state, 'isCollapsed');
    const arrowClassName = cn('purple-board__toggle purple-board__toggle_role_dropdown', {
      'purple-board__toggle_state_closed': !isCollapsed,
    });
    return (
      <div className="purple-board">
        <div className="purple-board__header">
          <div className="purple-board__header-info">
            <h2 className="purple-board__title">{title}</h2>
          </div>
          <div className="purple-board__header-toggle">
            <button onClick={this.toggleCollapse} type="button" className={arrowClassName} />
          </div>
        </div>
        <Collapse className="purple-board__content" style={{ display: 'block' }} isOpened={isCollapsed}>
          <div className="purple-board__content-inner">{children}</div>
        </Collapse>
      </div>
    );
  }
}
