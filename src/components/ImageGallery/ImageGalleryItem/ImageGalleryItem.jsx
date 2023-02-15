import { Component } from 'react';
import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    openModal: false,
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { description, preview, original } = this.props;
    const { openModal } = this.state;

    return (
      <Item>
        <Image src={preview} alt={description} onClick={this.openModal} />
        {openModal && (
          <Modal onClose={this.closeModal} alt={description} image={original} />
        )}
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  description: PropTypes.string.isRequired,
  original: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
