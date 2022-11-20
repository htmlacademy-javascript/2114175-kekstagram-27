import {debounce, getRandomArrayElement} from './util.js';
import {renderListing} from './listing.js';

const RERENDER_DELAY = 300;
const RANDOM_PHOTO_NUM = 10;
const FILTERS = {
  DEFAULT: 'filter-default', RANDOM: 'filter-random', DISCUSSED: 'filter-discussed',
};

const imgFilters = document.querySelector('.img-filters');

const getActiveFilterId = () => document.querySelector('.img-filters__button--active')
  .getAttribute('id');

const registerFilters = (onFilterChange) => {
  // отображаем фильтры
  imgFilters.classList.remove('img-filters--inactive');

  // кнопки фильтра
  const imgFilterButtons = document.querySelectorAll('.img-filters__button');

  // перерисовка фото по клику на фильтр
  const filterButtonClickHandler = debounce((evt) => {
    imgFilterButtons.forEach((imgFilterButton) => {
      imgFilterButton.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    onFilterChange();
  }, RERENDER_DELAY);

  imgFilterButtons.forEach((imgFilterButton) => {
    imgFilterButton.addEventListener('click', filterButtonClickHandler);
  });
};

const filterPhotos = (photos) => {
  const filterId = getActiveFilterId();
  let renderPhotos = [];
  switch (filterId) {
    case FILTERS.DEFAULT:
      renderPhotos = photos;
      break;
    case FILTERS.RANDOM:
      do {
        const randomPhoto = getRandomArrayElement(photos);
        if (!renderPhotos.includes(randomPhoto)) {
          renderPhotos.push(randomPhoto);
        }
      } while (renderPhotos.length < RANDOM_PHOTO_NUM);
      break;
    case FILTERS.DISCUSSED:
      renderPhotos = [...photos].sort((a, b) => b.comments.length - a.comments.length);
      break;
  }
  renderListing(renderPhotos);
};

export {registerFilters, filterPhotos};

