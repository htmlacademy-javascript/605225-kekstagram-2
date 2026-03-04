import { isEscapeKey } from './util.js';

const imageUploadField = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const formCloseButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

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

  if (hashtagList.length > 5) {
    return false;
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  for (let i = 0; i < hashtagList.length; i++) {
    if (!hashtagRegex.test(hashtagList[i])) {
      return false;
    }
  }

  const uniqueHashtags = new Set(hashtagList.map((tag) => tag.toLowerCase()));

  if (uniqueHashtags.size !== hashtagList.length) {
    return false;
  }

  return true;
};

const getErrorMessage = (value) => {
  const hashtagList = value.trim().split(' ');

  if (hashtagList.length > 5) {
    return 'Не больше 5 хэштегов';
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  for (let i = 0; i < hashtagList.length; i++) {
    if (!hashtagRegex.test(hashtagList[i])) {
      return 'Хэштег должен начинаться с #, содержать от 1 до 19 символов, только буквы и цифры';
    }
  }

  const uniqueHashtags = new Set(hashtagList.map((tag) => tag.toLowerCase()));

  if (uniqueHashtags.size !== hashtagList.length) {
    return 'Хэштеги не должны повторяться';
  }
};

pristine.addValidator(hashtagField, validateHashtag, getErrorMessage);

const openOverlay = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeOverlay = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadForm.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && document.activeElement !== hashtagField && document.activeElement !== commentField) {
    evt.preventDefault();
    closeOverlay();
  }
}

const addUploadFormHandler = () => {
  imageUploadField.addEventListener('change', () => {
    openOverlay();
  });
  formCloseButton.addEventListener('click', () => {
    closeOverlay();
  });
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export { addUploadFormHandler };
