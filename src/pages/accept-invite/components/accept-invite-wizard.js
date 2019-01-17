import React, { Component, Fragment } from 'react';
import { Form } from 'react-final-form';
import oFetch from 'o-fetch';

export default class AcceptInviteWizard extends Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {},
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  handleSubmit = values => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    }
    this.next(values);
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const headerRenderer = oFetch(activePage, 'props.headerRenderer');
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form initialValues={values} onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting, pristine, submitError }) => (
          <Fragment>
            {headerRenderer()}
            <form onSubmit={handleSubmit}>
              <div className="purple-modal__content">
                {submitError && (
                  <div className="purple-form-error purple-form-error_role_general purple-form-error_position_above">
                    <p className="purple-form-error__text">{submitError}</p>
                  </div>
                )}
                {activePage}
                <div className="purple-form__field purple-form__field_justify_center purple-form__field_position_last">
                  {page > 0 && (
                    <button
                      onClick={this.previous}
                      className="purple-button purple-button_color_accent-primary purple-button_size_l"
                      type="button"
                    >
                      <span className="purple-button__text">Back</span>
                    </button>
                  )}
                  {!isLastPage && (
                    <button
                      className="purple-button purple-button_color_accent-primary purple-button_size_l"
                      type="submit"
                    >
                      <span className="purple-button__text">Continue</span>
                    </button>
                  )}
                  {isLastPage && (
                    <button
                      disabled={submitting}
                      className="purple-button purple-button_color_accent-primary purple-button_size_l"
                      type="submit"
                    >
                      <span className="purple-button__text">Sign Up</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </Fragment>
        )}
      </Form>
    );
  }
}
