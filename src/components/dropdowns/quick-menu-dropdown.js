import React, { Component, Fragment } from 'react';
import oFetch from 'o-fetch';
import iScroll from 'boss-iscroll';
import ReactIScroll from 'react-iscroll';
import Link from 'found/lib/Link';
import DropdownButton from '../dropdown-button';

const scrollOptions = {
  mouseWheel: true,
  interactiveScrollbars: true,
  shrinkScrollbars: 'scale',
  fadeScrollbars: false,
  click: true,
  scrollbars: true,
  enable_ofscroll: true,
};

export default class QuickMenuDropdown extends Component {
  render() {
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
                            <input name="Search" id="Search" type="text" placeholder="" />
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
                        <div className="purple-quick-access__group">
                          <div className="purple-quick-access__group-header">
                            <h4 className="purple-quick-access__group-title">Main pages</h4>
                          </div>
                          <div className="purple-quick-access__aliases">
                            <div className="purple-quick-access__alias">
                              <div className="purple-alias">
                                <Link onClick={handleClick} to="/invites" className="purple-alias__link">
                                  <span className="purple-alias__icon purple-alias__icon_type_solid">In</span>
                                  <span className="purple-alias__text">Invites</span>
                                </Link>
                              </div>
                            </div>
                            <div className="purple-quick-access__alias">
                              <div className="purple-alias">
                                <Link onClick={handleClick} to="/users" className="purple-alias__link">
                                  <span className="purple-alias__icon purple-alias__icon_type_solid">Us</span>
                                  <span className="purple-alias__text">Users</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
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
