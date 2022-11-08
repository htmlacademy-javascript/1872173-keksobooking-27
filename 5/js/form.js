function pageDisabled() {

  if () {
    const formDIsabled = document.querySelector('.ad-form');
    formDIsabled.classList.add('.ad-form--disabled');
    const fieldsetDIsabled = document.querySelectorALL('fieldset');
    fieldsetDIsabled.classList.add('disabled');
  }
  else {
    fieldsetDIsabled.classList.remove('disabled');
    formDIsabled.classList.remove('.ad-form--disabled');
  }
}
