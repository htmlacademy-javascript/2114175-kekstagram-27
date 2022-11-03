import {renderListing} from './listing.js';
import {showAlert} from './util.js';
import {showModal} from './details.js';
import {registerUploadFormEvents} from './upload-form.js';

const onPhotoLoaded = (photos) => {
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
};

// Загрузка фотографий
fetch('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then(onPhotoLoaded)
  .catch((err) => console.log(err))
  .catch(() => showAlert('Не удалось загрузить фотографии'));

