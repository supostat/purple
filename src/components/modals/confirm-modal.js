import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import oFetch from 'o-fetch';
import cn from 'classnames';
import { Button } from '~/components';

const RED_TITLE_CLASS = 'purple-modal__header_color_accent-red';
const GREEN_TITLE_CLASS = 'purple-modal__header_color_accent-green';

const TITLE_CLASS_PROPS = {
  red: RED_TITLE_CLASS,
  green: GREEN_TITLE_CLASS,
};

class ContentModal extends Component {
  static defaultProps = {
    titleColor: 'green',
  };

  render() {
    const [children, title, cancelTitle, confirmTitle, onCancel, onConfirm, titleColor] = oFetch(
      this.props,
      'children',
      'title',
      'cancelTitle',
      'confirmTitle',
      'onCancel',
      'onConfirm',
      'titleColor',
    );
    const titleClassNames = cn(
      'purple-modal__header purple-modal__header_justify_center',
      TITLE_CLASS_PROPS[titleColor] || GREEN_TITLE_CLASS,
    );
    return (
      <Modal
        isOpen
        ariaHideApp={false}
        shouldCloseOnOverlayClick
        onRequestClose={onCancel}
        className="purple-modal purple-modal_size_xs purple-modal_space_l"
      >
        <div className={titleClassNames}>
          <h2 className="purple-modal__title">{title}</h2>
        </div>
        {children}
        <div className="purple-modal__footer">
          <div className="purple-modal__actions">
            <button
              onClick={onCancel}
              className="purple-button purple-button_color_accent-red purple-button_icon_close purple-button_size_s purple-modal__action"
              type="button"
            >
              <span className="purple-button__text">{cancelTitle}</span>
            </button>
            <Button
              text={confirmTitle}
              onClick={onConfirm}
              className="purple-button purple-button_color_accent-green purple-button_icon_check purple-button_size_s purple-modal__action"
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default function openConfirmModal({
  onSubmit = () => {},
  title,
  cancelTitle = 'Cancel',
  confirmTitle = 'Confirm',
  titleColor = '',
  contentTitle = '',
  closeCallback = () => {},
}) {
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

  return ContentComponent => {
    ReactDOM.render(
      <ContentModal
        title={title}
        cancelTitle={cancelTitle}
        confirmTitle={confirmTitle}
        onConfirm={handleSubmit}
        onCancel={handleClose}
        titleColor={titleColor}
      >
        <ContentComponent title={contentTitle} />
      </ContentModal>,
      wrapper,
    );
  };
}
