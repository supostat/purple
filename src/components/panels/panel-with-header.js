import React, { Component } from 'react';
import oFetch from 'o-fetch';

export default class PanelWithHeader extends Component {
  renderHeader = () => {
    const headerRenderer = oFetch(this.props, 'headerRenderer');
    return React.cloneElement(headerRenderer());
  };

  render() {
    const children = oFetch(this.props, 'children');
    return (
      <div className="purple-panel purple-panel_role_manager">
        <div className="purple-panel__header purple-panel__header_type_marked">
          <div className="purple-panel__header-group">{this.renderHeader()}</div>
        </div>
        <div className="purple-panel__content">
          <div className="purple-panel__content-inner">{children}</div>
        </div>
      </div>
    );
  }
}
