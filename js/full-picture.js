import { isEscapeKey } from './util.js';

const fullPictureModal = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const modalCloseButton = fullPictureModal.querySelector('.big-picture__cancel');
const commentCount = fullPictureModal.querySelector('.social__comment-count');
const loadComments = fullPictureModal.querySelector('.comments-loader');
const imageContainer = fullPictureModal.querySelector('.big-picture__img');
const pictureInfo = fullPictureModal.querySelector('.social__header');
const commentsList = fullPictureModal.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const renderComments = (commentData) => {
  commentData.forEach(({avatar, message, name}) => {
    const commentItem = document.createElement('li');
    const commentImage = document.createElement('img');
    const commentText = document.createElement('p');
    commentItem.classList.add('social__comment');
    commentImage.classList.add('social__picture');
    commentImage.src = avatar;
    commentImage.width = 35;
    commentImage.height = 35;
    commentImage.alt = name;
    commentText.textContent = message;
    commentItem.appendChild(commentImage);
    commentItem.appendChild(commentText);
    commentsList.appendChild(commentItem);
  });
};

const openModal = (smallPictureData) => {
  fullPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  loadComments.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  imageContainer.querySelector('img').src = smallPictureData.url;
  pictureInfo.querySelector('.likes-count').textContent = smallPictureData.likes;
  pictureInfo.querySelector('.social__caption').textContent = smallPictureData.description;

  commentsList.innerHTML = '';
  renderComments(smallPictureData.comments);
};

function closeModal() {
  fullPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const addModalHandler = (picturesData) => {
  picturesContainer.addEventListener('click', (evt) => {
    const targetPictureId = Number(evt.target.dataset.pictureId);

    if (!targetPictureId) {
      return;
    }

    const targetPictureData = picturesData.find((picture) => picture.id === targetPictureId);

    if (targetPictureData) {
      openModal(targetPictureData);
    }
  });

  modalCloseButton.addEventListener('click', closeModal);
};

export { addModalHandler };
