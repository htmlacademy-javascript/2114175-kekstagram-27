import {createPhotos} from './data.js';
const renderListing = function () {
  const photos = createPhotos();
  const listing = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i <= photos.length - 1; i++) {
    const element = pictureTemplate.cloneNode(true); // Клонируем элемент со всеми "внутренностями"
    const image = element.querySelector('.picture__img');
    const comments = element.querySelector('.picture__comments');
    const likes = element.querySelector('.picture__likes');
    const photo = photos[i];
    image.src = photo.url;
    comments.textContent = photo.comments.length;
    likes.textContent = photo.likes;
    fragment.appendChild(element);
  }

  listing.appendChild(fragment);
};

export {renderListing};
