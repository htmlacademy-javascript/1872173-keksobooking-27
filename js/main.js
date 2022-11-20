import {buildBookingOffer} from './data.js';
import {mapInit} from './map.js';
import './slider.js';
import { formStatus, inactiveMapFilters, onUserFormSubmit, resettingForm, onResetClick } from './user_form.js';

const offersArray = Array.from({ length: 10 }, buildBookingOffer);

mapInit(offersArray);

// formStatus();
// inactiveMapFilters();

onUserFormSubmit(resettingForm);
onResetClick();
