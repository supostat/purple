import React, { Component } from 'react';
import oFetch from 'o-fetch';

export default class HistoryList extends Component {
  state = {
    isLoaded: false,
  };

  componentDidMount = async () => {
    const getData = oFetch(this.props, 'getData');
    await getData();
    this.setState({ isLoaded: true });
  };

  renderHistory(items) {
    const itemRenderer = oFetch(this.props, 'itemRenderer');
    return Object.entries(items).map(entry => {
      const [updatedAt, historyEntry] = entry;
      return React.cloneElement(itemRenderer({ updatedAt, historyEntry }), {
        key: updatedAt,
      });
    });
  }

  render() {
    const items = oFetch(this.props, 'items');
    const isLoaded = oFetch(this.state, 'isLoaded');
    if (!isLoaded) {
      return null;
    }
    return (
      <div className="purple-history purple-history_type_panel">
        <ul className="purple-history__list">{this.renderHistory(items)}</ul>
      </div>
    );
  }
}
