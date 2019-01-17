import React, { Component, Fragment, useRef } from 'react';
import oFetch from 'o-fetch';

export default class DropdownButton extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      show: false,
    };
  }

  clickOutsideListener = event => {
    // Do nothing if clicking ref's element or descendent elements
    if (!this.ref.current || this.ref.current.contains(event.target)) {
      return;
    }

    this.setState({ show: false });
  };

  componentDidMount = () => {
    document.addEventListener('mousedown', this.clickOutsideListener);
    document.addEventListener('touchstart', this.clickOutsideListener);
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.clickOutsideListener);
    document.removeEventListener('touchstart', this.clickOutsideListener);
  };

  toggleShow = () => {
    this.setState(state => ({ show: !state.show }));
  };

  render() {
    const render = oFetch(this.props, 'render');
    const show = oFetch(this.state, 'show');

    return render(this.ref, this.toggleShow, show);
  }
}
