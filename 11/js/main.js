import {renderListing} from './listing.js';
import {showAlert} from './util.js';
import {loadPhotos} from './api.js';
import {registerUploadFormEvents} from './upload-form.js';
import {registerFilters, filterPhotos} from './filters.js';

const onPhotoLoaded = (photos) => {
  // отображаем фото
  renderListing(photos);

  // Регистрируем события для формы загрузки
  registerUploadFormEvents();

  // фильтры
  registerFilters(() => filterPhotos(photos));
};

const onPhotoLoadError = () => showAlert('Не удалось загрузить фотографии');

// Загрузка фотографий
loadPhotos(onPhotoLoaded, onPhotoLoadError);

