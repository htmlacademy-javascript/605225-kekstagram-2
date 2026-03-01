import { createPhotosData } from './data.js';
import { renderPictures } from './pictures.js';
import { addModalHandler } from './full-picture.js';

const data = createPhotosData();
renderPictures(data);
addModalHandler(data);
