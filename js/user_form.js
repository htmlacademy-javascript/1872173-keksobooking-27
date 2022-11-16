const orderForm = document.querySelector('.ad-form');
const capacityElement = orderForm.querySelector('#capacity');
const roomElement = orderForm.querySelector('#room_number');

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
  const price = orderForm.querySelector('#price');
  return value.length > 100000;
}

pristine.addValidator(
  orderForm.querySelector('#price'),
  validatePrice,
  'Не более 100 000'
);

const capacityCheck = () => ROOMS_TO_GUESTS[roomElement.value].includes(capacityElement.value);

const getСapacityElementErrorMessage = () => `Для такого количества гостей подойдёт ${GUESTS_TO_ROOMS[capacityElement.value].join(' или ')}`;


pristine.addValidator(
  capacityElement,
  capacityCheck,
  getСapacityElementErrorMessage
);

const getRoomElementErrorMessage = () => {
  if (roomElement.value === '100') {
    return 'Комнаты не для гостей';
  }
  return 'Для такого количества гостей нужно больше комнат';
};

pristine.addValidator(
  roomElement,
  capacityCheck,
  getRoomElementErrorMessage
);


const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};


const onGuestsNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomElement);
};


roomElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onGuestsNumberChange);
