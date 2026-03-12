import { renderPictures } from './pictures.js';
import { getRandomInteger } from './util.js';

const FILTERS_ID = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};
const RANDOM_COUNT = 10;

const filtersBlock = document.querySelector('.img-filters');
const filtersForm = filtersBlock.querySelector('.img-filters__form');
const filtersButtons = filtersForm.querySelectorAll('.img-filters__button');

const onFilterChange = (filtersData, evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  filtersButtons.forEach((element) => element.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
  const filterId = evt.target.id;
  filterPictures(filtersData, filterId);
};

function filterPictures(filtersData, filterId) {
  if (filterId === FILTERS_ID.default) {
    renderPictures(filtersData);
  } else if (filterId === FILTERS_ID.random) {
    let randomData = filtersData.slice();

    for (let i = randomData.length - 1; i > 0; i--) {
      const j = getRandomInteger(0, i);
      [randomData[i], randomData[j]] = [randomData[j], randomData[i]];
    }

    randomData = randomData.slice(0, RANDOM_COUNT);
    renderPictures(randomData);
  } else if (filterId === FILTERS_ID.discussed) {
    const discussedData = filtersData.slice();
    discussedData.sort(compareCommentCount);
    renderPictures(discussedData);
  }
}
function compareCommentCount(pictureA, pictureB) {
  const commentCountA = pictureA.comments.length;
  const commentCountB = pictureB.comments.length;

  return commentCountB - commentCountA;
}

const addFiltersHandler = (filtersData) => {
  filtersBlock.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', (evt) => {
    onFilterChange(filtersData, evt);
  });
};

export { addFiltersHandler };
