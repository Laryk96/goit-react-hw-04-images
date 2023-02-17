import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Backdrop, ModalBody } from './Modal.styled';

const Modal = ({ onClose, alt, image }) => {
  const portal = document.getElementById('modal');

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <Backdrop onClick={onClose}>
      <ModalBody>
        <img src={image} alt={alt} />
      </ModalBody>
    </Backdrop>,
    portal
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
