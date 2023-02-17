import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import { useState } from 'react';
import { Image, Item } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ description, preview, original }) => {
  const [openModal, setOpenModal] = useState(false);

  const open = () => {
    setOpenModal(true);
  };

  const close = () => {
    setOpenModal(false);
  };

  return (
    <Item>
      <Image src={preview} alt={description} onClick={open} />
      {openModal && (
        <Modal onClose={close} alt={description} image={original} />
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  description: PropTypes.string.isRequired,
  original: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
