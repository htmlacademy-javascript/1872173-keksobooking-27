const addForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const formChangeStatus = (form) => {
  form.querySelectorAll('fieldset, select.map__filter').forEach((fieldItem) => {
    fieldItem.disabled = !fieldItem.disabled;
  });
};

const formStatus = () => {
  addForm.classList.toggle('ad-form--disabled');

  formChangeStatus(addForm);
};

const inactiveMapFilters = () => {
  mapFilters.classList.toggle('ad-form--disabled');

  formChangeStatus(mapFilters);
};

export {formStatus , inactiveMapFilters};
