const uploadForm = document.querySelector('#upload-select-image');
const fileInput = document.querySelector('#upload-file');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const cancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'invalid',
  successClass: 'valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-error'
}, false);

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
  if (hashtags.length > 5) {
    return false;
  }

  // только уникальные хэштеги
  const uniqueHashtags = hashtags
    .map((hashtag) => hashtag.toLowerCase())
    .filter((hashtag, index, self) => {
      return self.indexOf(hashtag) === index;
    });
  if (uniqueHashtags.length < hashtags.length) {
    return false;
  }

  return hashtags.every((hashtag) => {
    // длина от 2 до 20 символов
    if (hashtag.length < 2 || hashtag.length > 20) {
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

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  validateHashtags,
  'Неверные хэштеги'
);

function validateComment (value) {
  return value.length <= 140;
}

pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  validateComment,
  'Неверный комментарий'
);

uploadForm.onsubmit = (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();
  if (valid) {
    // todo submit
  }
};

const showForm = (file) => {
  // заменяем тестовую картинку
  uploadPreview.src = URL.createObjectURL(file);
  // показываем форму
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeForm = () => {
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
};

export {registerUploadFormEvents};
