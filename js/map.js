import {createPopup} from './popup.js';

const addressElement = document.querySelector('#address');

const START_COORDINATE = {
  startLat: 35.683171,
  startLng: 139.753143
};


const DEFAULT_ZOOM = 10;

const map = L.map('map-canvas')
  .setView({
    lat: START_COORDINATE.startLat,
    lng: START_COORDINATE.startLng
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
    lat: START_COORDINATE.startLat,
    lng: START_COORDINATE.startLng,
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

const setOnMapLoad = (cb) => map.on('load', cb);

const mapInit = () => {
  map();
  setMainPinMarker();
  setAddressOnPinMove();
};

const resetMap = () => {
  map.closePopup();
  map.setView({
    lat: START_COORDINATE.startLat,
    lng: START_COORDINATE.startLng
  }, DEFAULT_ZOOM);
  mainPinMarker.setLatLng({
    lat: START_COORDINATE.startLat,
    lng: START_COORDINATE.startLng
  });
};


export { mapInit, setStartAddress, setOnMapLoad, setMainPinMarker, setOfferPinMarker, resetMap };


