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

const onCloseSuccessButtonClick = () => {
  closeSuccessPopup();
};

const onDocumentKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    closeSuccessPopup();
  }
};

const onDocumentClickSuccess = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessPopup();
  }
};

const onCloseErrorButtonClick = () => {
  closeErrorPopup();
};

const onDocumentKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    closeErrorPopup();
  }
};

const onDocumentClickError = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    closeErrorPopup();
  }
};

const showUploadSuccessMessage = () => {
  const formSuccessMessage = formSuccessTemplate.cloneNode(true);
  const successMessageCloseButton = formSuccessMessage.querySelector('.success__button');

  successMessageCloseButton.addEventListener('click', onCloseSuccessButtonClick);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.addEventListener('click', onDocumentClickSuccess);
  document.body.append(formSuccessMessage);
};

const showUploadErrorMessage = () => {
  const formErrorMessage = formErrorTemplate.cloneNode(true);
  const errorMessageCloseButton = formErrorMessage.querySelector('.error__button');

  errorMessageCloseButton.addEventListener('click', onCloseErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click', onDocumentClickError);
  document.body.append(formErrorMessage);
};

function closeSuccessPopup() {
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  document.removeEventListener('click', onDocumentClickSuccess);
  document.querySelector('.success').remove();
}

function closeErrorPopup() {
  document.removeEventListener('keydown', onDocumentKeydownError);
  document.removeEventListener('click', onDocumentClickError);
  document.querySelector('.error').remove();
}

export { showDataErrorMessage, showUploadSuccessMessage, showUploadErrorMessage };
