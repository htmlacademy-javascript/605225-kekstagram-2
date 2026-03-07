import { isEscapeKey } from './util.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_AMOUNT = 5;
const ERROR_MESSAGES = {
  amount: 'Не больше 5 хэштегов',
  regex: 'Хэштег должен начинаться с #, содержать от 1 до 19 символов, только буквы и цифры',
  unique: 'Хэштеги не должны повторяться'
};
const SCALE_STEP = 0.25;

const imageUploadField = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const formCloseButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let errorMessage = '';
let currentScale = 1;
let filterName = '';
let filterUnit = '';

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtagList = value.trim().split(' ');

  if (hashtagList.length > MAX_HASHTAG_AMOUNT) {
    errorMessage = ERROR_MESSAGES.amount;

    return false;
  }

  for (let i = 0; i < hashtagList.length; i++) {
    if (!HASHTAG_REGEX.test(hashtagList[i])) {
      errorMessage = ERROR_MESSAGES.regex;

      return false;
    }
  }

  const uniqueHashtags = new Set(hashtagList.map((tag) => tag.toLowerCase()));

  if (uniqueHashtags.size !== hashtagList.length) {
    errorMessage = ERROR_MESSAGES.unique;

    return false;
  }

  return true;
};

const getErrorMessage = () => errorMessage;

const imageScaleBigger = () => {
  if (currentScale !== 1) {
    currentScale += SCALE_STEP;
    imagePreview.style.transform = `scale(${currentScale})`;
    scaleControlInput.value = `${currentScale * 100}%`;
  }
};

const imageScaleSmaller = () => {
  if (currentScale !== 0.25) {
    currentScale -= SCALE_STEP;
    imagePreview.style.transform = `scale(${currentScale})`;
    scaleControlInput.value = `${currentScale * 100}%`;
  }
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

const getSliderOptions = (evt) => {
  const effectName = evt.target.id;

  if (effectName === 'effect-none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = '';
    filterName = '';
    filterUnit = '';
    effectLevelInput.value = 0;
  } else if (effectName === 'effect-chrome') {
    effectLevelContainer.classList.remove('hidden');
    filterName = 'grayscale';
    filterUnit = '';
    effectLevelInput.value = 1;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
  } else if (effectName === 'effect-sepia') {
    effectLevelContainer.classList.remove('hidden');
    filterName = 'sepia';
    filterUnit = '';
    effectLevelInput.value = 1;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
  } else if (effectName === 'effect-marvin') {
    effectLevelContainer.classList.remove('hidden');
    filterName = 'invert';
    filterUnit = '%';
    effectLevelInput.value = 100;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    });
  } else if (effectName === 'effect-phobos') {
    effectLevelContainer.classList.remove('hidden');
    filterName = 'blur';
    filterUnit = 'px';
    effectLevelInput.value = 3;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  } else if (effectName === 'effect-heat') {
    effectLevelContainer.classList.remove('hidden');
    filterName = 'brightness';
    filterUnit = '';
    effectLevelInput.value = 3;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  }
};

const getEffectValue = () => {
  const effectValue = effectLevelSlider.noUiSlider.get();
  effectLevelInput.value = effectValue;
  imagePreview.style.filter = `${filterName}(${effectValue}${filterUnit})`;
};

const openFormModal = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectLevelContainer.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  imagePreview.style.transform = `scale(${currentScale})`;
  scaleControlBigger.addEventListener('click', imageScaleBigger);
  scaleControlSmaller.addEventListener('click', imageScaleSmaller);
  effectLevelSlider.noUiSlider.on('update', getEffectValue);
  effectsList.addEventListener('change', getSliderOptions);
  effectLevelInput.value = 0;
};

const closeFormModal = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadForm.reset();
  pristine.reset();
  errorMessage = '';
  filterName = '';
  filterUnit = '';
  currentScale = 1;
  imagePreview.style.filter = '';
  scaleControlBigger.removeEventListener('click', imageScaleBigger);
  scaleControlSmaller.removeEventListener('click', imageScaleSmaller);
  effectsList.removeEventListener('change', getSliderOptions);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && document.activeElement !== hashtagField && document.activeElement !== commentField) {
    evt.preventDefault();
    closeFormModal();
  }
}

const onUploadFieldChange = () => openFormModal();

const onCloseButtonClick = () => closeFormModal();

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Форма отправлена');
  }
};

const addUploadFormHandler = () => {
  imageUploadField.addEventListener('change', onUploadFieldChange);
  formCloseButton.addEventListener('click', onCloseButtonClick);
  pristine.addValidator(hashtagField, validateHashtag, getErrorMessage);
  imageUploadForm.addEventListener('submit', onFormSubmit);
};

export { addUploadFormHandler };
