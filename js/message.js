import { escapeKey } from './util.js';

const body = document.querySelector('body');

const patternSuccess = document.querySelector('#success').content.querySelector('.success');
const patternFailed = document.querySelector('#error').content.querySelector('.error');


const onCloseMessageClick = () => {
  body.querySelector('.message-popup').remove();
  document.removeEventListener('keydown', onEscKeydown, { once: true });
  document.removeEventListener('click', onCloseMessageClick, { once: true });
};

const onOpenMessageClick = (message) => {
  const messageElement = message.cloneNode(true);
  body.append(messageElement);
  document.addEventListener('keydown', onEscKeydown, { once: true });
  document.addEventListener('click', onCloseMessageClick, { once: true });
};

function onEscKeydown (evt) {
  if (escapeKey(evt)) {
    evt.preventDefault();
    onCloseMessageClick();
  }
}

const getSuccessfulDownloorderForm = () => {
  onOpenMessageClick(patternSuccess);
};

const getFailedDownloorderForm = () => {
  onOpenMessageClick(patternFailed);
  const buttonErrorForm = patternFailed.querySelector('.error__button');
  buttonErrorForm.addEventListener('keydown', onCloseMessageClick, { once: true });
};


export {getSuccessfulDownloorderForm, getFailedDownloorderForm};
