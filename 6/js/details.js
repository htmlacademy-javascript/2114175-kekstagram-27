const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureComLoader = bigPicture.querySelector('.comments-loader');
const bigPictureSocCount = bigPicture.querySelector('.social__comment-count');
const bigPictureClose = bigPicture.querySelector('.cancel');

const fragmentComment = document.createDocumentFragment();

const showModal = function (photo) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;

  for (let i = 0; i <= photo.comments.length - 1; i++) {
    const photoComment = photo.comments[i];
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

  bigPictureComments.innerHTML = '';
  bigPictureComments.appendChild(fragmentComment);
  bigPictureComLoader.classList.add('hidden');
  bigPictureSocCount.classList.add('hidden');
};

const closeModal = function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureComLoader.classList.remove('hidden');
  bigPictureSocCount.classList.remove('hidden');
};

document.body.addEventListener('keypress', (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
});
bigPictureClose.addEventListener('click', closeModal);

export {showModal};
