import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import oFetch from 'o-fetch';

class ContentModal extends Component {
  render() {
    const [children, title, onClose] = oFetch(this.props, 'children', 'title', 'onClose');
    return (
      <Modal
        isOpen
        ariaHideApp={false}
        shouldCloseOnOverlayClick
        onRequestClose={onClose}
        className="purple-modal purple-modal_size_m-minor purple-modal_space_m"
      >
        <button onClick={onClose} type="button" className="purple-modal__close" />
        <header className="purple-modal__header purple-modal__header_adjust_close">
          <h2 className="purple-modal__title">{title}</h2>
        </header>
        <div className="purple-modal__content">{children}</div>
      </Modal>
    );
  }
}

export default function openContentModal({ onSubmit = () => {}, title, props, closeCallback = () => {} }) {
  const bodyFirst = document.body.firstChild;
  const wrapper = document.createElement('div');

  const destroyModal = () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(wrapper);
      wrapper.remove();
    }, 50);
  };

  const handleClose = () => {
    destroyModal();
    return closeCallback();
  };

  const handleCloseAfterSubmit = () => {
    destroyModal();
  };

  bodyFirst.parentNode.insertBefore(wrapper, bodyFirst);

  const handleSubmit = (...args) => Promise.resolve(onSubmit(handleCloseAfterSubmit, ...args));

  return WrappedComponent => {
    ReactDOM.render(
      <ContentModal title={title} onClose={handleClose}>
        <WrappedComponent onSubmit={handleSubmit} {...props} />
      </ContentModal>,
      wrapper,
    );
  };
}
