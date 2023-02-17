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

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { onClose, image, alt } = this.props;
//     const portal = document.getElementById('modal');

//     return ReactDOM.createPortal(
//       <Backdrop onClick={onClose}>
//         <ModalBody>
//           <img src={image} alt={alt} />
//         </ModalBody>
//       </Backdrop>,
//       portal
//     );
//   }
// }
