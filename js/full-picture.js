import { isEscapeKey } from './util.js';

const COMMENT_AMOUNT = 5;
let currentAmount = COMMENT_AMOUNT;
let commentsLoaderData;

const fullPictureModal = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const modalCloseButton = fullPictureModal.querySelector('.big-picture__cancel');
const commentCount = fullPictureModal.querySelector('.social__comment-shown-count');
const totalComments = fullPictureModal.querySelector('.social__comment-total-count');
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
  commentsList.innerHTML = '';

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
  commentsLoaderData = smallPictureData;

  fullPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  loadComments.addEventListener('click', loadMoreComments);
  document.addEventListener('keydown', onDocumentKeydown);

  imageContainer.querySelector('img').src = smallPictureData.url;
  pictureInfo.querySelector('.likes-count').textContent = smallPictureData.likes;
  pictureInfo.querySelector('.social__caption').textContent = smallPictureData.description;
  totalComments.textContent = smallPictureData.comments.length;

  commentsList.innerHTML = '';

  if (smallPictureData.comments.length < COMMENT_AMOUNT) {
    renderComments(smallPictureData.comments);
    loadComments.classList.add('hidden');
    commentCount.textContent = smallPictureData.comments.length;
  } else {
    renderComments(smallPictureData.comments.slice(0, COMMENT_AMOUNT));
  }
};

function closeModal() {
  fullPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  loadComments.removeEventListener('click', loadMoreComments);
  currentAmount = COMMENT_AMOUNT;
  commentCount.textContent = COMMENT_AMOUNT;
  loadComments.classList.remove('hidden');
}

function loadMoreComments() {
  currentAmount += COMMENT_AMOUNT;

  if (currentAmount > commentsLoaderData.comments.length) {
    currentAmount = commentsLoaderData.comments.length;
    commentCount.textContent = currentAmount;
    renderComments(commentsLoaderData.comments);
    loadComments.classList.add('hidden');
    return;
  }

  commentCount.textContent = currentAmount;
  renderComments(commentsLoaderData.comments.slice(0, currentAmount));
}

const addModalHandler = (picturesData) => {
  picturesContainer.addEventListener('click', (evt) => {
    const targetPictureId = Number(evt.target.dataset.pictureId);

    if (Number.isNaN(targetPictureId)) {
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
