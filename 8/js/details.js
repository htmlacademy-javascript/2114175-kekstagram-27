const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureComLoader = bigPicture.querySelector('.comments-loader');
const bigPictureComCount = bigPicture.querySelector('.social__comment-count');
const bigPictureClose = bigPicture.querySelector('.cancel');
const fragmentComment = document.createDocumentFragment();
const COMMENTS_PER_PAGE = 5;
let showCommentsCounter = 0;

const showMoreComments = (photo) => {
  // берем часть комментариев
  const comments = photo.comments.slice(showCommentsCounter, showCommentsCounter + COMMENTS_PER_PAGE);
  showCommentsCounter += comments.length;

  // выводим комментарии
  for (let i = 0; i <= comments.length - 1; i++) {
    const photoComment = comments[i];
    const comment = document.createElement('li');
    const commentImg = document.createElement('img');
    const commentText = document.createElement('p');
    comment.classList.add('social__comment');
    commentImg.classList.add('social__picture');
    commentText.classList.add('social__text');
    comment.appendChild(commentImg);
    comment.appendChild(commentText);
    commentImg.src = photoComment.avatar;
    commentText.textContent = photoComment.message;
    fragmentComment.appendChild(comment);
  }
  bigPictureComments.appendChild(fragmentComment);


  if (photo.comments.length <= COMMENTS_PER_PAGE) {
    // если комментов не больше 5, скрываем счетчик
    bigPictureComCount.classList.add('hidden');
  } else {
    // обновляем отображаемый счетчик комментариев
    bigPictureComCount.innerHTML = `${showCommentsCounter} из <span class="comments-count">${photo.comments.length}</span> комментариев`;
  }

  // скрываем "загрузить новые комментарии" если конец списка
  if (showCommentsCounter === photo.comments.length ) {
    bigPictureComLoader.classList.add('hidden');
  }
};

const showModal = function (photo) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;

  // очищаем комментарии
  bigPictureComments.innerHTML = '';
  // обнуляем счетчик показанных комментариев
  showCommentsCounter = 0;
  // показываем первые 5 комментариев
  showMoreComments(photo);

  // добавляем событие за загрузку новых комментариев
  bigPictureComLoader.onclick = () => {
    showMoreComments(photo);
  };
};

const closeModal = function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureComLoader.classList.remove('hidden');
  bigPictureComCount.classList.remove('hidden');
};

document.body.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
});
bigPictureClose.addEventListener('click', closeModal);

export {showModal};
