import { printNumerals } from './util.js';

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');

const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const removeElement = (fullArray, needArray) => {
  fullArray.forEach((arrayItem) => {
    if (needArray.indexOf(arrayItem.classList[1].replace('popup__feature--', '')) === -1) { arrayItem.remove(); }
  });
};


const createGalery = (container, photos) => {
  const photoNode = container.querySelector('.popup__photo');
  photos.forEach( (photo) => {
    const clonePhoto = photoNode.cloneNode(true);
    clonePhoto.src = photo;
    container.append(clonePhoto);
  });
  photoNode.remove();
};


const createPopup = ({offer, author}) => {
  const popupElement = template.cloneNode(true);

  const popupTitle = popupElement.querySelector('.popup__title');
  popupTitle.textContent = offer.title;
  const popupAdress = popupElement.querySelector('.popup__text--address');
  popupAdress.textContent = offer.address;
  const popupPrice = popupElement.querySelector('.popup__text--price');
  popupPrice.textContent = `${offer.price} ₽/ночь`;
  const popupGuestRoom = popupElement.querySelector('.popup__text--capacity');
  popupGuestRoom.textContent = `${offer.rooms} ${printNumerals(offer.rooms, ['комната','комнаты', 'комнат'])} для ${offer.guests} ${printNumerals(offer.guests, ['гость','гостя', 'гостей'])}`;
  const popupCheckInOut = popupElement.querySelector('.popup__text--time');
  popupCheckInOut.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const popupFeatures = popupElement.querySelector('.popup__features');
  const feature = popupFeatures.querySelectorAll('.popup__feature');
  if (offer.features) {
    removeElement(feature, offer.features);
  } else {
    popupFeatures.remove();
  }

  const popupDescription = popupElement.querySelector('.popup__description');
  popupDescription.textContent = offer.description;
  const popupType = popupElement.querySelector('.popup__type');
  if(offer.type) {
    popupType.textContent = OFFER_TYPES[offer.type];
  }
  const autorAvatar = popupElement.querySelector('.popup__avatar');
  autorAvatar.src = author.avatar;

  const galleryPopup = popupElement.querySelector('.popup__photos');
  if (offer.photos) {
    createGalery(galleryPopup, offer.photos);
  }
  else {
    galleryPopup.remove();
  }
  return popupElement;
};


export {createPopup};
