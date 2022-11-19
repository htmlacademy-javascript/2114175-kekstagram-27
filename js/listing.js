import {showModal} from './details.js';

const clearListing = () => {
  const pics = document.querySelectorAll('.picture');
  pics.forEach((pic) => {
    pic.remove();
  });
};

const renderListing = (photos) => {
  // удаляем фото
  clearListing();

  const listing = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const element = pictureTemplate.cloneNode(true); // Клонируем элемент со всеми "внутренностями"
    const image = element.querySelector('.picture__img');
    const comments = element.querySelector('.picture__comments');
    const likes = element.querySelector('.picture__likes');
    image.src = photo.url;
    comments.textContent = photo.comments.length;
    likes.textContent = photo.likes;
    fragment.appendChild(element);
  });

  listing.appendChild(fragment);

  const thumbnails = document.querySelectorAll('.picture');
  const addThumbnailClickHandler = (thumbnail, photo) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      showModal(photo);
    });
  };
  thumbnails.forEach((thumbnail, i) => {
    addThumbnailClickHandler(thumbnail, photos[i]);
  });
};

export {renderListing};
