const orderForm = document.querySelector('.ad-form');
const capacityElement = orderForm.querySelector('#capacity');
const rooms = orderForm.querySelector('#room_number');
const price = orderForm.querySelector('#price');
const typeOfHousing = orderForm.querySelector('#type');
const timeIn = orderForm.querySelector('#timein');
const timeOut = orderForm.querySelector('#timeout');
const submitButton = orderForm.querySelector('.ad-form__submit');

const ROOMS_TO_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const GUESTS_TO_ROOMS = {
  1: ['1', '2', '3 комнаты'],
  2: ['1', '2 комнаты'],
  3: ['3 комнаты'],
  0: ['100 комнат']
};

const ROOM_TYPE_PRICE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

const pristine = new Pristine(orderForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
}, true);

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  orderForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

function validatePrice (value) {
  return value.length > 100000;
}

pristine.addValidator(
  orderForm.querySelector('#price'),
  validatePrice,
  'Не более 100 000'
);

const capacityCheck = () => ROOMS_TO_GUESTS[rooms.value].includes(capacityElement.value);

const getСapacityElementErrorMessage = () => `Для такого количества гостей подойдёт ${GUESTS_TO_ROOMS[capacityElement.value].join(' или ')}`;


pristine.addValidator(
  capacityElement,
  capacityCheck,
  getСapacityElementErrorMessage
);

const getRoomElementErrorMessage = () => {
  if (rooms.value === '100') {
    return 'Комнаты не для гостей';
  }
  return 'Для такого количества гостей нужно больше комнат';
};

pristine.addValidator(
  rooms,
  capacityCheck,
  getRoomElementErrorMessage
);


const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(rooms);
};


const onGuestsNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(rooms);
};


rooms.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onGuestsNumberChange);

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);


const priceCheck = (value) => Number.parseInt(value, 10) >= ROOM_TYPE_PRICE[typeOfHousing.value];

const getPriceErrorMessage = () => `Стоимость должна быть выше ${ROOM_TYPE_PRICE[typeOfHousing.value]}`;

pristine.addValidator(
  price,
  priceCheck,
  getPriceErrorMessage
);

const onPriceCheck = () => pristine.validate(price);

price.addEventListener('change', onPriceCheck);
typeOfHousing.addEventListener('change', onPriceCheck);

const ontypeOfHousingChange = () => {
  price.placeholder = ROOM_TYPE_PRICE[typeOfHousing.value];
};

typeOfHousing.addEventListener('change', ontypeOfHousingChange);
