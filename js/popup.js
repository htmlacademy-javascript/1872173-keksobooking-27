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

const OFFER_FEATURES = {
  wifi: 'WiFi',
  dishwasher: 'Посудомоечная машина',
  parking: 'Парковка',
  washer: 'Душ',
  elevator: 'Лифт',
  conditioner: 'Кондиционер',
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


export function createPopup({offer, author}) {
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
  if(offer.features.length) {
    popupFeatures.textContent = offer.features.map((offer)=> OFFER_FEATURES[offer]).join(', ');
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
  createGalery(galleryPopup, offer.photos);


  return popupElement;
}


