import { showDataErrorMessage } from './status-messages.js';

const BASE_URL = 'https://31.javascript.htmlacadem.pro/kekstagram';
const route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = () => fetch(`${BASE_URL}${route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Data error');
    }
    return response.json();
  })
  .catch(() => {
    showDataErrorMessage();
  });

const sendData = (body) => fetch(
  `${BASE_URL}${route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Upload error');
    }
  })
  .catch(() => {
    throw new Error('Upload error');
  });

export { getData, sendData };
