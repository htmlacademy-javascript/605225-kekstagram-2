const EFFECTS_DATA = {
  'effect-chrome': {
    filterName: 'grayscale',
    filterUnit: '',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    startValue: 1
  },
  'effect-sepia': {
    filterName: 'sepia',
    filterUnit: '',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    startValue: 1
  },
  'effect-marvin': {
    filterName: 'invert',
    filterUnit: '%',
    options: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    },
    startValue: 100
  },
  'effect-phobos': {
    filterName: 'blur',
    filterUnit: 'px',
    options: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    },
    startValue: 3
  },
  'effect-heat': {
    filterName: 'brightness',
    filterUnit: '',
    options: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    },
    startValue: 3
  }
};

const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let filterName = '';
let filterUnit = '';

const onEffectChange = (evt) => {
  const effectName = evt.target.id;

  if (effectName === 'effect-none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = '';
    filterName = '';
    filterUnit = '';
    effectLevelInput.value = 0;

    return;
  }

  const currentEffectOptions = EFFECTS_DATA[effectName];
  filterName = currentEffectOptions.filterName;
  filterUnit = currentEffectOptions.filterUnit;
  effectLevelSlider.noUiSlider.updateOptions(currentEffectOptions.options);
  effectLevelInput.value = currentEffectOptions.startValue;
  effectLevelContainer.classList.remove('hidden');
};

const onSliderChange = () => {
  const effectValue = effectLevelSlider.noUiSlider.get();
  effectLevelInput.value = effectValue;
  imagePreview.style.filter = `${filterName}(${effectValue}${filterUnit})`;
};

const initEffects = () => {
  effectLevelContainer.classList.add('hidden');
  effectLevelSlider.noUiSlider.on('update', onSliderChange);
  effectsList.addEventListener('change', onEffectChange);
  effectLevelInput.value = 0;
};

const resetEffects = () => {
  filterName = '';
  filterUnit = '';
  imagePreview.style.filter = '';
  effectsList.removeEventListener('change', onEffectChange);
};

export { initEffects, resetEffects };
