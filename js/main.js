import { createPhotosData } from './data.js';
import { renderPictures } from './pictures.js';
import { addModalHandler } from './full-picture.js';
import { addUploadFormHandler } from './upload-form.js';

const data = createPhotosData();
renderPictures(data);
addModalHandler(data);
addUploadFormHandler();
