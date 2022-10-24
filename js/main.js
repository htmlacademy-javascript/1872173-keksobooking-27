function getRandomInteger(min, max) {
  const lower = min;
  const upper = max;
  return Math.random() * (upper - lower + 1) - lower;
}

if (getRandomInteger < 0) {
  console.log(NaN);
}
const OFFERS_COUNT = 10;
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const AUTHORS_MAX_COUNT = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 200000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 6;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const LOCATION_PRECISION = 5;
const userIds = [];


function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}


function getRandomPositiveFloat (a, b, digits = 1) {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}


function createUser () {

  let userId;

  while (!userId || userIds.includes(userId)) {
    const randomNumber = getRandomPositiveInteger(1, AUTHORS_MAX_COUNT);

    if (randomNumber < 10) {
      userId = `0${randomNumber}`;
    } else {
      userId = `${randomNumber}`;
    }
  }

  return {avatar: `img/avatars/user${userId}.png`};
}

function getRandomItems(count, itemsArray) {
  if (isNaN(count) || count < 1 || count > itemsArray.length) {
    return [];
  }

  const usedItems = [];
  let item;

  while (usedItems.length < count) {
    if (!item || usedItems.includes(item)) {
      item = itemsArray[getRandomPositiveInteger(0, itemsArray.length - 1)];
    } else {
      usedItems.push(item);
    }
  }

  return usedItems;
}

function buildOffer(location) {
  return {
    title: 'Жильё в аренду',
    address: `${location.lat}, ${location.lng}`,
    price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
    type: OFFER_TYPES[getRandomPositiveInteger(0, OFFER_TYPES.length - 1)],
    rooms: getRandomPositiveInteger(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomPositiveInteger(MIN_GUESTS, MAX_GUESTS),
    checkin: OFFER_CHECKIN[getRandomPositiveInteger(0, OFFER_CHECKIN.length - 1)],
    checkout: OFFER_CHECKOUT[getRandomPositiveInteger(0, OFFER_CHECKOUT.length - 1)],
    features: getRandomItems(getRandomPositiveInteger(0, FEATURES.length), FEATURES),
    description: 'Спокойное место для отдыха',
    photos: getRandomItems(getRandomPositiveInteger(0, PHOTOS.length), PHOTOS),
  };
}

function buildLocation() {
  return {
    lat: getRandomPositiveFloat(LAT_MIN, LAT_MAX, LOCATION_PRECISION),
    lng: getRandomPositiveFloat(LNG_MIN, LNG_MAX, LOCATION_PRECISION),
  };
}

function buildBookingOffer() {
  const location = buildLocation();

  return {
    author: createUser(),
    offer: buildOffer(location),
    location,
  };
}
