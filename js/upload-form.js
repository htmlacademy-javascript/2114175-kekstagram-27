const uploadForm = document.querySelector('#upload-select-image');
const fileInput = document.querySelector('#upload-file');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const cancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview img');
const HASHTAGS_MAX_LENGTH = 5;
const HASHTAG_MIN_LENGTH = 2;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

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


// открытие формы
const showForm = (file) => {
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
    evt.preventDefault();
    const valid = pristine.validate();
    if (valid) {
      // todo submit
    }
  };
};

export {registerUploadFormEvents};
