import { escapeKey, enterKey } from './util.js';

const body = document.querySelector('body');

const patternSuccess = document.querySelector('#success').content.querySelector('.success');
const patternFailed = document.querySelector('#error').content.querySelector('.error');


const onSuccessMessageClick = () => {
  body.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeydown, { once: true });
  document.removeEventListener('click', onSuccessMessageClick, { once: true });
};

const closeOpenSuccessMessage = () => {
  document.addEventListener('keydown', onSuccessMessageEscKeydown, { once: true });
  document.addEventListener('click', onSuccessMessageClick, { once: true });
};

function onSuccessMessageEscKeydown (evt) {
  if (escapeKey(evt)) {
    evt.preventDefault();
    onSuccessMessageClick();
  }
}

const getSuccessfulDownloorderForm = () => {
  const ticetElement = patternSuccess.cloneNode(true);
  body.append(ticetElement);
  closeOpenSuccessMessage();
};

const onFailedMessageEscKeydown = (evt) => {
  if (escapeKey(evt)) {
    evt.preventDefault();
    body.removeChild(body.querySelector('.error'));

  }
};

const onFailedMessageClick = () => {
  body.removeChild(body.querySelector('.error'));

};

const onFailedMessageEnterKeydown = (evt) => {
  if (enterKey(evt)) {
    evt.preventDefault();
    body.removeChild(body.querySelector('.error'));

  }
};

const closeOpenFailedMessage = (buttonErrorForm) => {
  document.addEventListener('keydown', onFailedMessageEscKeydown, { once: true });
  document.addEventListener('click', onFailedMessageClick, { once: true });
  buttonErrorForm.addEventListener('keydown', onFailedMessageEnterKeydown, { once: true });
};


const getFailedDownloorderForm = () => {
  const ticetElement = patternFailed.cloneNode(true);
  body.append(ticetElement);

  closeOpenFailedMessage(document.querySelector('.error__button'));
};


export {getSuccessfulDownloorderForm, getFailedDownloorderForm};
