import { createPhotosData } from './data.js';

const picturesBlock = document.querySelector('.pictures');
const picturesBlockTitle = picturesBlock.querySelector('.pictures__title');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesData = createPhotosData();
const picturesBlockFragment = document.createDocumentFragment();

picturesBlockTitle.classList.remove('visually-hidden');

picturesData.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  picturesBlockFragment.appendChild(pictureElement);
});

picturesBlock.appendChild(picturesBlockFragment);
