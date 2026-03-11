import { renderPictures } from './pictures.js';
import { addModalHandler } from './full-picture.js';
import { addUploadFormHandler } from './upload-form.js';
import { showDataErrorMessage } from './status-messages.js';
import { getData } from './api.js';

getData()
  .then((data) => {
    renderPictures(data);
    addModalHandler(data);
  })
  .catch(showDataErrorMessage);

addUploadFormHandler();
