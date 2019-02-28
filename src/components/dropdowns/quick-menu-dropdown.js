import React, { Component, Fragment } from 'react';
import oFetch from 'o-fetch';
import { connect } from 'react-redux';
import iScroll from 'boss-iscroll';
import ReactIScroll from 'react-iscroll';
import Link from 'found/lib/Link';
import DropdownButton from '../dropdown-button';
import { menuSelector } from '~/redux/selectors';
import { getMenuAction } from '~/redux/actions/menu';
import { quickMenuFilter, quickMenuHighlightResults, generateQuickMenuAlias } from '~/utils/filtering';

const scrollOptions = {
  mouseWheel: true,
  interactiveScrollbars: true,
  shrinkScrollbars: 'scale',
  fadeScrollbars: false,
  click: true,
  scrollbars: true,
  enable_ofscroll: true,
};

class QuickMenuDropdown extends Component {
  state = {
    searchString: '',
  };

  componentDidMount = () => {
    const getMenu = oFetch(this.props, 'getMenu');
    getMenu();
  };

  handleSearch = e => {
    const value = oFetch(e, 'target.value');
    this.setState({ searchString: value });
  };

  getQuickMenu = menu => {
    const searchString = oFetch(this.state, 'searchString');
    return quickMenuHighlightResults(quickMenuFilter(searchString, menu), searchString);
  };

  render() {
    const menu = oFetch(this.props, 'menu');
    if (!menu || menu.length === 0) {
      return null;
    }
    const searchString = oFetch(this.state, 'searchString');
    return (
      <DropdownButton
        render={(ref, handleClick, show) => (
          <div ref={ref}>
            <button
              onClick={handleClick}
              type="button"
              className="purple-page-header__action purple-page-header__action_role_search"
            >
              Search
            </button>
            {show && (
              <div className="purple-page-header__dropdown purple-page-header__dropdown_role_search purple-page-header__dropdown_state_opened">
                <div className="purple-page-header__dropdown-header">
                  <p className="purple-page-header__dropdown-label purple-page-header__dropdown-label_role_search">
                    Search
                  </p>
                  <div className="purple-page-header__dropdown-filter">
                    <div className="purple-form">
                      <div className="purple-form__field purple-form__field_position_last">
                        <div className="purple-form-field purple-form-field_adjust_quick-access-search">
                          <div className="purple-form-field__input">
                            <input
                              onChange={this.handleSearch}
                              value={searchString}
                              type="text"
                              placeholder="Search ..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClick}
                    className="purple-page-header__dropdown-label purple-page-header__dropdown-label_role_action purple-page-header__dropdown-label_role_close purple-page-header__dropdown-label_type_icon"
                  >
                    Close
                  </button>
                </div>
                <div className="purple-page-header__dropdown-scroll">
                  <ReactIScroll iScroll={iScroll} options={this.scrollOptions}>
                    <div className="purple-page-header__dropdown-content">
                      <div className="purple-quick-access">
                        {this.getQuickMenu(menu).map(group => {
                          const [title, items, groupName, color] = oFetch(group, 'title', 'items', 'name', 'color');
                          return (
                            <div key={groupName} className="purple-quick-access__group">
                              <div className="purple-quick-access__group-header">
                                <h4
                                  className="purple-quick-access__group-title"
                                  dangerouslySetInnerHTML={{ __html: group.highlightedTitle || group.title }}
                                />
                              </div>
                              <div className="purple-quick-access__aliases">
                                {items.map(item => {
                                  const [showInMenu, itemTitle, path, itemName, highlightedTitle] = oFetch(
                                    item,
                                    'show_in_menu',
                                    'title',
                                    'path',
                                    'name',
                                    'highlightedTitle',
                                  );
                                  if (!showInMenu) {
                                    return null;
                                  }
                                  return (
                                    <div key={itemName} className="purple-quick-access__alias">
                                      <div className="purple-alias">
                                        <Link onClick={handleClick} to={path} className="purple-alias__link">
                                          <span
                                            className="purple-alias__icon purple-alias__icon_type_solid"
                                            style={{
                                              backgroundColor: color,
                                              borderColor: color,
                                            }}
                                          >
                                            {generateQuickMenuAlias(itemTitle)}
                                          </span>
                                          <span
                                            className="purple-alias__text"
                                            style={{ color }}
                                            dangerouslySetInnerHTML={{ __html: highlightedTitle || itemTitle }}
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </ReactIScroll>
                </div>
              </div>
            )}
          </div>
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    menu: menuSelector(state),
  };
};

const mapDispatchToProps = {
  getMenu: getMenuAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuickMenuDropdown);
