import { isEscapeKey } from './util.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showUploadSuccessMessage, showUploadErrorMessage } from './status-messages.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_AMOUNT = 5;
const ERROR_MESSAGES = {
  amount: 'Не больше 5 хэштегов',
  regex: 'Хэштег должен начинаться с #, содержать от 1 до 19 символов, только буквы и цифры',
  unique: 'Хэштеги не должны повторяться'
};

const imageUploadField = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const formCloseButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const effectLevelSlider = document.querySelector('.effect-level__slider');

let errorMessage = '';

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

const openFormModal = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initScale();
  initEffects();
};

const closeFormModal = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadForm.reset();
  pristine.reset();
  errorMessage = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  resetEffects();
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
    sendData(new FormData(evt.target))
      .then(() => {
        closeFormModal();
      })
      .then(() => {
        showUploadSuccessMessage();
      })
      .catch(() => {
        showUploadErrorMessage();
      });
  }
};

const addUploadFormHandler = () => {
  imageUploadField.addEventListener('change', onUploadFieldChange);
  formCloseButton.addEventListener('click', onCloseButtonClick);
  pristine.addValidator(hashtagField, validateHashtag, getErrorMessage);
  imageUploadForm.addEventListener('submit', onFormSubmit);

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  });
};

export { addUploadFormHandler };
