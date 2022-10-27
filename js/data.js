import {getRandomArrayElement, getRandomPositiveInteger} from './util.js';

// Уникальный id фото
let photosId = 0;
const getPhotoId = () => ++photosId;

// Уникальный id комментов
let commentId = 0;
const getCommentId = () => ++commentId;

// Генерируем случайные пути к фото
const maxPhotoNum = 25;
const generatePhotoPath = (id) => `photos/${id}.jpg`;

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
const names = [
  'Артём',
  'Вероника',
  'Андрей',
  'Светлана',
  'Николай',
  'Александра'
];

// Генерируем аватары

const minAvatarNum = 1;
const maxAvatarNum = 6;

const generateAvatarPath = () => `img/avatar-${getRandomPositiveInteger(minAvatarNum, maxAvatarNum)}.svg`;

// Генерируем комментарий
const createComment = () => ({
  id: getCommentId(),
  avatar: generateAvatarPath(),
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

// Генерируем лайки
const minLikesNum = 15;
const maxLikesNum = 200;

const generateLikesNum = () => getRandomPositiveInteger(minLikesNum, maxLikesNum);

// Генерируем фото
const createPhoto = () => {
  const id = getPhotoId();
  return {
    id: id,
    url: generatePhotoPath(id),
    description: getRandomArrayElement(photoDescriptions),
    likes: generateLikesNum(),
    //  функция создающая массив, длиной от 1 до 20, и заполняет массив сгенерированными коментами
    comments: Array.from({length: getRandomPositiveInteger(1, 20)}, createComment),
  };
};

const createPhotos = () => Array.from({length: maxPhotoNum}, createPhoto);

export {createPhotos};
