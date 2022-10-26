const fileInput = document.querySelector('#upload-file');
const cancel = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview img');

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
    if (evt.key === 'Escape') {
      cancel.click();
    }
  });
  cancel.addEventListener('click', closeForm);
};

export {registerUploadFormEvents};
