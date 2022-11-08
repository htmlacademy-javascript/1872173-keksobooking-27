import {buildOffer, buildLocation, buildBookingOffer} from './data.js';
import {createPopup} from './popup.js';
// import {pageDisabled} from './form.js';
const mapCanvas = document.querySelector('#map-canvas');
const offer = buildBookingOffer();

const popupNode = createPopup(offer);

mapCanvas.append(popupNode);
