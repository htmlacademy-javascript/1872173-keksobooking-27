const addForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');


const toggleElementsState = (elements, state) => {
  for (const element of elements) {
    element.disabled = state;
  }
};

const formDisabled = () => {
  addForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');

  toggleElementsState(addForm.children, true);
  toggleElementsState(mapFilters.children, true);
};

const formAdle = () => {
  addForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  toggleElementsState(addForm.children, false);
  toggleElementsState(mapFilters.children, false);
};

export {formDisabled, formAdle};
