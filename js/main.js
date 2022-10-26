import {renderListing} from './listing.js';
import './util.js';import {createPhotos} from './data.js';
import {showModal} from './details.js';
import {registerUploadFormEvents} from './upload-form.js';
const photos = createPhotos();
renderListing(photos);

const thumbnails = document.querySelectorAll('.picture');
const addThumbnailClickHandler = function (thumbnail, photo) {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showModal(photo);
  });
};
for (let i = 0; i <= thumbnails.length - 1; i++) {
  addThumbnailClickHandler(thumbnails[i], photos[i]);
}

// Регистрируем события для формы загрузки
registerUploadFormEvents();
