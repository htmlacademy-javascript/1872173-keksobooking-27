import {buildBookingOffer} from './data.js';
import {mapInit} from './map.js';
import {formStatus , inactiveMapFilters} from './form_validation.js';
import './user_form.js';
import './slider.js';

const offersArray = Array.from({ length: 5 }, buildBookingOffer);

mapInit(offersArray);
