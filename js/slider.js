const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const MAX_PRICE = 100000;
const resetButton = document.querySelector('.ad-form__reset');

valueElement.value = 5000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: 0,
  step: 500,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

const sliderReset = () => {
  sliderElement.noUiSlider.reset();
};


resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  sliderReset();
});

export {sliderReset};
