const MAX_ELEMENT = 10;
const DEFAULT_VALUE = 'any';

const priceHouse = {
  'low': {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: Infinity,
  },
};

const mapFilters = Array.from(document.querySelector('.map__filters').querySelectorAll('select, fieldset'));

const filterRules = {
  'housing-type': (data, filter) => filter.value === data.offer.type,
  'housing-price': (data, filter) => data.offer.price >= priceHouse[filter.value].start && data.offer.price < priceHouse[filter.value].end,
  'housing-rooms': (data, filter) => +filter.value === data.offer.rooms,
  'housing-guests': (data, filter) => +filter.value === data.offer.guests,
  'housing-features': (data, filter) => {
    let featuresChecked = [];
    featuresChecked = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
    return data.offer.features ? featuresChecked.every((checkbox) => data.offer.features.includes(checkbox.value)) : !(featuresChecked.length > 0);
  },
};

const filterData = (data) => {
  const filteredOffers = [];
  let i = 0;
  let isResult;

  while (i < data.length && filteredOffers.length < MAX_ELEMENT) {
    isResult = mapFilters.every((filter) => (filter.value === DEFAULT_VALUE) ? true : filterRules[filter.id](data[i], filter));


    if (isResult) {
      filteredOffers.push(data[i]);
    }

    i++;
  }

  return filteredOffers;
};

export {filterData};
