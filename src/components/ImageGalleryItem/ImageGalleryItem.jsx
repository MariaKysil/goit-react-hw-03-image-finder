import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imagesItem }) => {
  return imagesItem.map(({ id, webformatURL, tags }) => (
    <li key={id} className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.imageGalleryItemImage}
        id={id}
      />
    </li>
  ));
};
