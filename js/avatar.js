const chooserAccount = document.querySelector('.ad-form__field input[type=file]');
const preview = document.querySelector('.ad-form-header__preview img');
const choice = document.querySelector('.ad-form__upload input[type=file]');
const previewHouse = document.querySelector('.ad-form__photo');

const DEFAULT_AVATAR = '../img/muffin-grey.svg';


const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const isValidType = (file) => FILE_TYPES.some((it) => file.endsWith(it));

chooserAccount.addEventListener('change', () => {
  const file = chooserAccount.files[0];
  const fileName = file.name.toLowerCase();
  const isMatches = isValidType(fileName);

  if (isMatches) {
    preview.src = URL.createObjectURL(file);
  }
});


const onImageChange = () => {
  const file = choice.files[0];
  const fileName = file.name.toLowerCase();

  if (file && isValidType(fileName)) {
    previewHouse.innerHTML = '';
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.style.maxWidth = '100%';
    image.style.height = 'auto';
    previewHouse.append(image);
  }

};

choice.addEventListener('change', () => {
  onImageChange();
});

const resetImages = () => {
  preview.innerHTML = '';
  preview.src = DEFAULT_AVATAR;
  previewHouse.innerHTML = '';
};


export {
  resetImages,
};
