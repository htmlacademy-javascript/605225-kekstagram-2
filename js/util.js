const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const shuffleArray = (dataList) => {
  const randomData = dataList.slice();

  for (let i = randomData.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [randomData[i], randomData[j]] = [randomData[j], randomData[i]];
  }

  return randomData;
};

export { getRandomInteger, isEscapeKey, debounce, shuffleArray };
