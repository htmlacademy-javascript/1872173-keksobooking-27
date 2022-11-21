import {createPopup} from './popup.js';
import {filterData} from './sorting.js';
import {formStatus, inactiveMapFilters} from './user_form.js';
import {makeRequest} from './api.js';
import {alertMessage, debounce} from './util.js';

const addressElement = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');
const ALLERT_MESSAGE = 'Не удалось загрузить данные, повторите попывтку.';
const MAKS_ELEMENT = 10;
let options = [];

const COORDINATE = {
  lat: 35.683171,
  lng: 139.753143
};


const DEFAULT_ZOOM = 10;

const map = L.map('map-canvas')
  .setView({
    lat: COORDINATE.lat,
    lng: COORDINATE.lng
  }, DEFAULT_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: COORDINATE.lat,
    lng: COORDINATE.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const setMainPinMarker = () => mainPinMarker.addTo(map);

const setStartAddress = () => {
  const { lat, lng } = mainPinMarker.getLatLng();
  addressElement.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

const setAddressOnPinMove = () => {
  mainPinMarker.on('move', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    addressElement.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  });
};

const setOfferPinMarker = (offers) => {
  offers.forEach((offer) => {
    const offerMarker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon,
      }
    );
    offerMarker.addTo(map).bindPopup(createPopup(offer));
  });
};

const pointLayer = L.layerGroup().addTo(map);

const setOnMapLoad = (cb) => map.on('load', cb);

const mapInit = (offersData) => {
  setStartAddress();
  setOfferPinMarker(offersData);
  setMainPinMarker();
  setAddressOnPinMove();
};

const resetMap = () => {
  map.closePopup();
  map.setView({
    lat: COORDINATE.lat,
    lng: COORDINATE.lng
  }, DEFAULT_ZOOM);
  mainPinMarker.setLatLng({
    lat: COORDINATE.lat,
    lng: COORDINATE.lng
  });
};

const removePoints = () => {
  pointLayer.clearLayers();
};

const onMapFilterChange = () => {
  removePoints();

  setOfferPinMarker(filterData(options), createPopup);
};

const onSuccess = (data) => {
  options = data.slice();

  inactiveMapFilters();
  setOfferPinMarker(options.slice(0, MAKS_ELEMENT), createPopup);

  mapFilters.addEventListener('change', debounce(onMapFilterChange));
};

const onError = () => {
  alertMessage(ALLERT_MESSAGE);
};

map.on('load', () => {
  formStatus();
  makeRequest(onSuccess, onError, 'GET');
})
  .setView({
    lat: COORDINATE.lat,
    lng: COORDINATE.lng,
  }, DEFAULT_ZOOM);

const onButtonResetClick = () => {
  mainPinMarker.setlatlng({
    lat: COORDINATE.lat,
    lng: COORDINATE.lng,
  });

  map.setView({
    lat: COORDINATE.lat,
    lng: COORDINATE.lng,
  }, DEFAULT_ZOOM);

  removePoints();

  setOfferPinMarker(options.slice(0, MAKS_ELEMENT), createPopup);

};

resetButton.addEventListener('click', () => {
  onButtonResetClick();
});

export { mapInit, setStartAddress, setOnMapLoad, setMainPinMarker, setOfferPinMarker, resetMap, onButtonResetClick };


