import React, { Component } from 'react';
import oFetch from 'o-fetch';

export default class HistoryItem extends Component {
  renderHistoryLine = history => {
    const [id, displayedOldValue, displayedNewValue, displayedKey] = oFetch(
      history,
      'id',
      'displayedOldValue',
      'displayedNewValue',
      'displayedKey',
    );
    return (
      <li key={id} className="purple-panel__list-item">
        <p className="purple-panel__text">
          <span className="purple-panel__text-light">{`Field "${displayedKey}" was updated from`}</span>
          <span className="purple-panel__text-bold"> {displayedOldValue} </span>
          <span className="purple-panel__text-light">to</span>
          <span className="purple-panel__text-bold"> {displayedNewValue} </span>
        </p>
      </li>
    );
  };

  render() {
    const history = oFetch(this.props, 'history');
    const [updatedAt, historyEntry] = oFetch(history, 'updatedAt', 'historyEntry');
    const [updatedBy, historyItems] = oFetch(historyEntry, 'updatedBy', 'historyItems');
    return (
      <li className="purple-history__item">
        <div className="purple-history__content">
          <div className="purple-panel purple-panel_role_board-group purple-panel_page_user-profile-history">
            <div className="purple-panel__header">
              <div className="purple-panel__header-info">
                <h3 className="purple-panel__title">
                  <span className="purple-panel__title-light">{updatedAt}</span>
                </h3>
              </div>
            </div>
            <div className="purple-panel__group purple-panel__group_type_marked">
              <div className="purple-panel__group-content">
                <ul className="purple-panel__list">{historyItems.map(this.renderHistoryLine)}</ul>
              </div>
            </div>
            <div className="purple-panel__group">
              <div className="purple-panel__group-content">
                <p className="purple-panel__text">
                  <span className="purple-panel__text-light">Updated by </span>
                  <span className="purple-panel__text-bold">{updatedBy}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
