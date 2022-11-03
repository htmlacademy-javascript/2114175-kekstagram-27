const uploadForm = document.querySelector('#upload-select-image');
const fileInput = document.querySelector('#upload-file');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const cancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview img');
const scaleUp = document.querySelector('.scale__control--bigger');
const scaleDown = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const HASHTAGS_MAX_LENGTH = 5;
const HASHTAG_MIN_LENGTH = 2;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

// создаем слайдер
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

// создаем валидатор формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'invalid',
  successClass: 'valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-error'
}, false);

// функция валидации поля хэштеги
function validateHashtags (value) {
  // Нет хэштегов
  if(value === '') {
    return true;
  }

  const hashtags = value
    .replace(/\s\s+/g, ' ')
    .trim()
    .split(' ');

  // не больше 5 хэштегов
  if (hashtags.length > HASHTAGS_MAX_LENGTH) {
    return false;
  }

  // только уникальные хэштеги
  const uniqueHashtags = hashtags
    .map((hashtag) => hashtag.toLowerCase())
    .filter((hashtag, index, self) => self.indexOf(hashtag) === index);
  if (uniqueHashtags.length < hashtags.length) {
    return false;
  }

  return hashtags.every((hashtag) => {
    // длина от 2 до 20 символов
    if (hashtag.length < HASHTAG_MIN_LENGTH || hashtag.length > HASHTAG_MAX_LENGTH) {
      return false;
    }
    // начинается с #
    if (hashtag[0] !== '#') {
      return false;
    }
    // только буквы и цифры
    if (/^[0-9a-zA-Zа-яА-ЯёЁ]*$/g.test(hashtag.substring(1)) === false) {
      return false;
    }

    return true;
  });
}

// связываем валидатор с полем хэштеги
pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  validateHashtags,
  'Неверные хэштеги'
);

// функция валидации поля описание
function validateComment (value) {
  return value.length <= COMMENT_MAX_LENGTH;
}

// связываем валидатор с полем описание
pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  validateComment,
  'Неверный комментарий'
);

// настройки для фото
const photoSettings = {
  scale: 100,
  effect: 'none',
  effectLevel: 100,
};

// применение новых параметров слайдера
const updateEffectLevelSlider = (effect) => {
  let min = 1;
  let max = 100;
  let step = 1;
  switch (effect) {
    case 'none':
      break;
    case 'chrome':
    case 'sepia':
      min = 0;
      max = 1;
      step = 0.1;
      break;
    case 'marvin':
      min = 0;
      max = 100;
      step = 1;
      break;
    case 'phobos':
      min = 0;
      max = 3;
      step = 0.1;
      break;
    case 'heat':
      min = 1;
      max = 3;
      step = 0.1;
      break;
  }
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    step
  });
  effectLevelSlider.noUiSlider.set(max);
};

// метод применения эффекта к фото
const applyPhotoEffect = () => {
  switch (photoSettings.effect) {
    case 'none':
      uploadPreview.style.filter = null;
      break;
    case 'chrome':
      uploadPreview.style.filter = `grayscale(${photoSettings.effectLevel})`;
      break;
    case 'sepia':
      uploadPreview.style.filter = `sepia(${photoSettings.effectLevel})`;
      break;
    case 'marvin':
      uploadPreview.style.filter = `invert(${photoSettings.effectLevel}%)`;
      break;
    case 'phobos':
      uploadPreview.style.filter = `blur(${photoSettings.effectLevel}px)`;
      break;
    case 'heat':
      uploadPreview.style.filter = `brightness(${photoSettings.effectLevel})`;
      break;
  }
};

// метод для задания нового значения масштаб
const updatePhotoScale = (value) => {
  photoSettings.scale = value;
  scaleValue.value = `${value}%`;
  uploadPreview.style.transform = `scale(${value / 100})`;
};

// метод для задания нового значения эффект
const updatePhotoEffect = (value) => {
  photoSettings.effect = value;
  if (value === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

// метод для задания нового значения интенсивность эффекта
const updatePhotoEffectLevel = (value) => {
  effectLevelValue.value = value;
  photoSettings.effectLevel = value;
};

// метод обнуления настроек для фото
const resetPhotoSettings = () => {
  updateEffectLevelSlider('none');
  updatePhotoEffect('none');
  applyPhotoEffect();
  updatePhotoScale(100);
};

// открытие формы
const showForm = (file) => {
  resetPhotoSettings();
  // заменяем тестовую картинку
  uploadPreview.src = URL.createObjectURL(file);
  // показываем форму
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// закрытие формы
const closeForm = () => {
  // сбрасываем ошибки
  pristine.reset();

  // скрываем форму
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onSuccessSend = () => {
  // сообщение что все успешно
  const success = successTemplate.cloneNode(true);
  document.body.appendChild(success);

  // закрытие сообщения
  // todo закрытие по esc
  const successClose = document.querySelector('.success__button');
  successClose.addEventListener('click', () => {
    closeForm();
    document.body.removeChild(document.querySelector('.success'));
  });
};

const onErrorSend = () => {
  // сообщение об ошибке
  const error = errorTemplate.cloneNode(true);
  document.body.appendChild(error);

  // закрытие сообщения
  // todo закрытие по esc
  const errorClose = document.querySelector('.error__button');
  errorClose.addEventListener('click', () => {
    document.body.removeChild(document.querySelector('.error'));
  });
};

// отправка формы
const sendForm = () => {
  // todo data
  const formData = new FormData();
  fetch('https://27.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSuccessSend();
      } else {
        onErrorSend();
      }
    })
    .catch(onErrorSend);
};

// Регистрация событий
const registerUploadFormEvents = () => {
  // событие на выбор картинки
  fileInput.onchange = function () {
    showForm(fileInput.files[0]);
  };

  // событие на закрытие формы
  document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
      cancel.click();
    }
  });
  cancel.addEventListener('click', closeForm);

  // событие на отправку
  uploadForm.onsubmit = (evt) => {
    const valid = pristine.validate();
    evt.preventDefault();
    if (valid) {
      sendForm();
    }
  };

  // события на масштабирование
  scaleUp.addEventListener('click', () => {
    if (photoSettings.scale < SCALE_MAX) {
      updatePhotoScale(photoSettings.scale + SCALE_STEP);
    }
  });
  scaleDown.addEventListener('click', () => {
    if (photoSettings.scale > SCALE_MIN) {
      updatePhotoScale(photoSettings.scale - SCALE_STEP);
    }
  });

  // событие на смену эффекта
  const effectsRadio = document.querySelectorAll('.effects__radio');
  effectsRadio.forEach((radio) => radio.addEventListener('change', () => {
    updateEffectLevelSlider(radio.value);
    updatePhotoEffect(radio.value);
    applyPhotoEffect();
  }));

  // при изменении слайдера
  effectLevelSlider.noUiSlider.on('update', () => {
    updatePhotoEffectLevel(effectLevelSlider.noUiSlider.get());
    applyPhotoEffect();
  });
};

export {registerUploadFormEvents};
