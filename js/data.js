import {getRandomArrayElement, getRandomPositiveInteger} from './util.js';

// Уникальный id фото
let photoId = 0;
const getPhotoId = () => ++photoId;

// Уникальный id комментов
let commentId = 0;
const getCommentId = () => ++commentId;

// Массивы данных
const photoDescriptions = [
  'Всё отлично!',
  'Чувствую себя прекрасно!',
  'Все как всегда',
];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const avatars = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
];
const names = [
  'Артём',
  'Вероника',
  'Андрей',
  'Светлана',
  'Николай',
  'Александра'
];

// Генерируем комментарий
const createComment = () => ({
  id: getCommentId(),
  avatar: getRandomArrayElement(avatars),
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

// Генерируем фото
const createPhoto = () => {
  const id = getPhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(photoDescriptions),
    likes: getRandomPositiveInteger(15, 200),
    //  функция создающая массив, длиной от 1 до 2, и заполняет массив сгенерированными коментами
    comments: Array.from({length: getRandomPositiveInteger(1, 2)}, createComment),
  };
};

const createPhotos = () => Array.from({length: 25}, createPhoto);

export {createPhotos};
