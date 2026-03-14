import { renderPictures } from './pictures.js';
import { debounce, shuffleArray } from './util.js';

const FILTERS_ID = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};
const RANDOM_COUNT = 10;

const filtersBlock = document.querySelector('.img-filters');
const filtersForm = filtersBlock.querySelector('.img-filters__form');
const filtersButtons = filtersForm.querySelectorAll('.img-filters__button');

const filterPictures = debounce((filtersData, filterId) => {
  switch (filterId) {
    case FILTERS_ID.default:
      renderPictures(filtersData);
      break;
    case FILTERS_ID.random:
      renderPictures(shuffleArray(filtersData).slice(0, RANDOM_COUNT));
      break;
    case FILTERS_ID.discussed:
      renderPictures(filtersData.toSorted((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length));
      break;
    default:
      throw new Error(`Unknown filter: ${filterId}`);
  }
}, 500);

const onFilterChange = (filtersData, evt) => {
  if (!evt.target.classList.contains('img-filters__button') || evt.target.classList.contains('img-filters__button--active') || !evt.target.id) {
    return;
  }

  filtersButtons.forEach((element) => element.classList.remove('img-filters__button--active'));

  evt.target.classList.add('img-filters__button--active');
  filterPictures(filtersData, evt.target.id);
};

const addFiltersHandler = (filtersData) => {
  filtersBlock.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    onFilterChange(filtersData, evt);
  });
};

export { addFiltersHandler };
