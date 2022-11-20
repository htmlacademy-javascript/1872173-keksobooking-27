function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

export const printNumerals = (number, titles) => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    const cases = [2, 0, 1, 1, 1, 2];
    const text =
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    return `${text}`;
  }
  return `${titles[1]}`;
};

const escapeKey = (evt) => evt.key === 'Escape';
const enterKey = (evt) => evt.key === 'Enter';

export {getRandomPositiveInteger, getRandomPositiveFloat, escapeKey, enterKey};
