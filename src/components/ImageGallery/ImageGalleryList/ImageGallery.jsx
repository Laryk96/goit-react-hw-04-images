import PropTypes from 'prop-types';

import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ items }) => {
  return (
    <Gallery>
      {items.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          original={largeImageURL}
          preview={webformatURL}
          description={tags}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array,
};

export default ImageGallery;
