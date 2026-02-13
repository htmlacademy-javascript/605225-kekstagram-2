import { getRandomInteger, getRandomArrayElement } from './util.js';

const PHOTO_QUANTITY = 25;

const PHOTO_DESCRIPTIONS = [
  'Пляж в моем отеле',
  'Иду на пляж',
  'Солнечный день на море',
  'Встретил девушку-фотографа',
  'Забавный обед в отеле',
  'Моя машина',
  'Перекус в стиле минимализма',
  'Натуральный морс из свежих ягод',
  'Самолеты летают прямо над головой',
  'Необычное решение для хранения обуви',
  'Дорога к морю',
  'Увидел интересный кастом для фар',
  'Изысканный обед',
  'Увидел в интернете милого кота',
  'Идеальные тапки для моего дома',
  'Пролетаем над облаками',
  'Пришли на концерт хорового пения',
  'Эстетика старых машин',
  'Очень нужная вещь, постоянно натыкаюсь на своего кота ночью',
  'Дворик в тропическом стиле',
  'Ужин в стиле ЗОЖ',
  'Волшебный закат',
  'Встретил крабика на пляже',
  'Зажигательная атмосфера на концерте',
  'Отправились в сафари на джипе'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_NAMES = [
  'Джек',
  'Мария',
  'Карен',
  'Джеральд',
  'Дмитрий',
  'Грогу',
  'СуперКот241',
  'Марко',
  'Мопс',
  'OldMacdonald',
  'RedFish095',
  'Harold',
  'Frank',
  'Daniel',
  'Robert'
];

let lastId = 0;
let urlNumber = 0;
let descriptionNumber = 0;
const usedIds = [];

const generateId = function () {
  lastId += 1;

  return lastId;
};

const generateUrl = function () {
  urlNumber += 1;

  return `photos/${ urlNumber }.jpg`;
};

const generateDescription = () => PHOTO_DESCRIPTIONS[descriptionNumber++];

const generateRandomId = function (min, max) {
  let currentId = getRandomInteger(min, max);

  while (usedIds.includes(currentId)) {
    currentId = getRandomInteger(min, max);
  }

  usedIds.push(currentId);

  return currentId;
};

const generateAvatar = () => `img/avatar-${ getRandomInteger(1, 6) }.svg`;

const createComment = () => ({
  id : generateRandomId(1, 1000),
  avatar : generateAvatar(),
  message : getRandomArrayElement(COMMENT_MESSAGES),
  name : getRandomArrayElement(COMMENT_NAMES)
});

const createPhoto = () => ({
  id : generateId(),
  url : generateUrl(),
  description : generateDescription(),
  likes : getRandomInteger(15, 200),
  comments : Array.from({length: getRandomInteger(0, 30)}, createComment)
});

const createPhotosData = () => Array.from({length: PHOTO_QUANTITY}, createPhoto);

export { createPhotosData };
