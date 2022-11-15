import {getRandomArrayElement, getRandomPositiveInteger} from './util.js';

// Уникальный id фото
let photosId = 0;
const getPhotoId = () => ++photosId;

// Уникальный id комментов
let commentId = 0;
const getCommentId = () => ++commentId;

// Генерируем случайные пути к фото
const MAX_PHOTO_NUM = 25;
const generatePhotoPath = (id) => `photos/${id}.jpg`;

// Массивы данных
const PHOTO_DESCRIPTIONS = [
  'Всё отлично!',
  'Чувствую себя прекрасно!',
  'Все как всегда',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Артём',
  'Вероника',
  'Андрей',
  'Светлана',
  'Николай',
  'Александра'
];

// Генерируем аватары

const MIN_AVATAR_NUM = 1;
const MAX_AVATAR_NUM = 6;

const generateAvatarPath = () => `img/avatar-${getRandomPositiveInteger(MIN_AVATAR_NUM, MAX_AVATAR_NUM)}.svg`;

// Генерируем комментарий
const createComment = () => ({
  id: getCommentId(),
  avatar: generateAvatarPath(),
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Генерируем лайки
const MIN_LIKES_NUM = 15;
const MAX_LIKES_NUM = 200;

const generateLikesNum = () => getRandomPositiveInteger(MIN_LIKES_NUM, MAX_LIKES_NUM);

// Генерируем фото
const createPhoto = () => {
  const id = getPhotoId();
  return {
    id: id,
    url: generatePhotoPath(id),
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: generateLikesNum(),
    //  функция создающая массив, длиной от 1 до 20, и заполняет массив сгенерированными коментами
    comments: Array.from({length: getRandomPositiveInteger(1, 20)}, createComment),
  };
};

const createPhotos = () => Array.from({length: MAX_PHOTO_NUM}, createPhoto);

export {createPhotos};
