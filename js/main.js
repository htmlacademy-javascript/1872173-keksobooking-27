import {initMap , resetMap} from './map.js';
import './slider.js';
import { formStatus, inactiveMapFilters, onUserFormSubmit, resettingForm, onResetClick } from './user-form.js';
import './message.js';

initMap();

formStatus();
inactiveMapFilters();

onUserFormSubmit(resettingForm, resetMap);
onResetClick();
