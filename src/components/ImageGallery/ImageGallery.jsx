import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.imageGallery} onClick={onClick}>
      <ImageGalleryItem imagesItem={images} />
    </ul>
  );
};
