import {mapInit , resetMap} from './map.js';
import './slider.js';
import { formStatus, inactiveMapFilters, onUserFormSubmit, resettingForm, onResetClick } from './user_form.js';
import './message.js';

mapInit();

formStatus();
inactiveMapFilters();

onUserFormSubmit(resettingForm, resetMap);
onResetClick();
