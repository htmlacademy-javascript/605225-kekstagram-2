import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const formSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const formErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const showDataErrorMessage = () => {
  const alertContainer = alertTemplate.cloneNode(true);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showUploadSuccessMessage = () => {
  const formSuccessMessage = formSuccessTemplate.cloneNode(true);
  const successMessageCloseButton = formSuccessMessage.querySelector('.success__button');
  successMessageCloseButton.addEventListener('click', closeUploadSuccessMessage);
  document.addEventListener('keydown', closeUploadSuccessMessage);
  document.addEventListener('click', closeUploadSuccessMessage);
  document.body.append(formSuccessMessage);
};

const showUploadErrorMessage = () => {
  const formErrorMessage = formErrorTemplate.cloneNode(true);
  const errorMessageCloseButton = formErrorMessage.querySelector('.error__button');
  errorMessageCloseButton.addEventListener('click', closeUploadErrorMessage);
  document.addEventListener('keydown', closeUploadErrorMessage);
  document.addEventListener('click', closeUploadErrorMessage);
  document.body.append(formErrorMessage);
};

function closeUploadSuccessMessage (evt) {
  if (isEscapeKey(evt) || !evt.target.closest('.success_inner')) {
    document.removeEventListener('keydown', closeUploadSuccessMessage);
    document.removeEventListener('click', closeUploadSuccessMessage);
    document.querySelector('.success').remove();
  } else if (evt.target.classList.contains('.success__button')) {
    document.removeEventListener('keydown', closeUploadSuccessMessage);
    document.removeEventListener('click', closeUploadSuccessMessage);
    evt.target.closest('.success').remove();
  }
}

function closeUploadErrorMessage (evt) {
  if (isEscapeKey(evt) || !evt.target.closest('.error_inner')) {
    document.removeEventListener('keydown', closeUploadErrorMessage);
    document.removeEventListener('click', closeUploadErrorMessage);
    document.querySelector('.error').remove();
  } else if (evt.target.classList.contains('.error__button')) {
    document.removeEventListener('keydown', closeUploadErrorMessage);
    document.removeEventListener('click', closeUploadErrorMessage);
    evt.target.closest('.error').remove();
  }
}

export { showDataErrorMessage, showUploadSuccessMessage, showUploadErrorMessage };
