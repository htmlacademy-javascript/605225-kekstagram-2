const SCALE_STEP = 0.25;
const MAX_SCALE = 1;
const MIN_SCALE = 0.25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const onButtonScaleBiggerClick = () => {
  currentScale = Math.min(MAX_SCALE, currentScale + SCALE_STEP);
  imagePreview.style.transform = `scale(${currentScale})`;
  scaleControlInput.value = `${currentScale * 100}%`;
};

const onButtonScaleSmallerClick = () => {
  currentScale = Math.max(MIN_SCALE, currentScale - SCALE_STEP);
  imagePreview.style.transform = `scale(${currentScale})`;
  scaleControlInput.value = `${currentScale * 100}%`;
};

const initScale = () => {
  imagePreview.style.transform = `scale(${currentScale})`;
  scaleControlBigger.addEventListener('click', onButtonScaleBiggerClick);
  scaleControlSmaller.addEventListener('click', onButtonScaleSmallerClick);
};

const resetScale = () => {
  currentScale = MAX_SCALE;
  scaleControlBigger.removeEventListener('click', onButtonScaleBiggerClick);
  scaleControlSmaller.removeEventListener('click', onButtonScaleSmallerClick);
};

export { initScale, resetScale };
